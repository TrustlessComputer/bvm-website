'use client';

import React, { useEffect, useRef, useState } from 'react';
import { generateTokenWithTwPost } from '@/services/player-share';
import localStorage from '@/utils/localstorage';
import { KEY_TWITTER_TOKEN } from '@/constants/storage-key';
import { getReferralCode } from '@/services/referral';
import { getLink } from '@/utils/helpers';
import CookieUtil from '@/utils/cookie';

import s from './SignInForm.module.scss';
import Image from 'next/image';
import { CDN_URL_ICONS } from '@/config';
import IssueForm from './IssueForm';
import { Form } from 'react-final-form';
// import useAnalyticsEventTracker, { AlphaActions } from '@/utils/ga';

const SignInForm = ({ onClose, setShowTrouble }: any) => {
  const refForm = useRef<any>();
  const [submitting, setSubmitting] = useState(false);

  const timer = useRef<any>();
  const [hasLinkTwitter, setHasLinkTwitter] = useState<boolean>(false);
  const [twProfile, setTwProfile] = useState<any>(null);
  // const gaEventTracker = useAnalyticsEventTracker();

  useEffect(() => {
    if (twProfile) {
      setSubmitting(true);
      timer.current = setInterval(async () => {
        handleVerifyTwitter();
      }, 5000);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [twProfile]);

  const handleVerifyTwitter = async (): Promise<void> => {
    try {
      const result = await generateTokenWithTwPost(twProfile?.secret_code);
      if (result) {
        clearInterval(timer.current);
        const twitterToken = localStorage.get(KEY_TWITTER_TOKEN);
        if (!twitterToken || twitterToken !== result?.token) {
          localStorage.set(KEY_TWITTER_TOKEN, result?.token);
          CookieUtil.set(KEY_TWITTER_TOKEN, result?.token);
        }
        setHasLinkTwitter(true);
        setSubmitting(false);
        setShowTrouble && setShowTrouble(false);

        if (twProfile?.issued) {
          // gaEventTracker(
          //   AlphaActions.PostTweetSignInSuccessTw,
          //   JSON.stringify({
          //     info: {
          //       twitter_username: twProfile?.twitter_username,
          //     },
          //   }),
          // );
        } else {
          // gaEventTracker(
          //   AlphaActions.PostTweetSignUpSuccessTw,
          //   JSON.stringify({
          //     info: {
          //       twitter_username: twProfile?.twitter_username,
          //     },
          //   }),
          // );
        }

        try {
          getReferralCode();
        } catch (e) {
          console.log('getReferralCode', e);
        }
      }
    } catch (err) {
      console.log('handleVerifyTwitter', err);
    }
  };

  const onSubmit = async (values: any) => {
    const { referralCode, twitterProfile } = values;
    try {
      setTwProfile(twitterProfile);

      const shareUrl = getLink(referralCode);
      let content = '';

      if (twitterProfile?.issued) {
        content = `I’ve joined @AlphaOnBitcoin, and I’m having a blast!\n\nThe features are top-notch and interface is simply intuitive. Plus, there are countless cool tools to build your community.\n\nI’m happy to hook you up right here:\n\n#alpha${twitterProfile?.public_code}\n\n`;
      } else {
        content = `I've joined @AlphaOnBitcoin, and I'm getting a kick out of it!\n\nChat. Trade. Play. And other prompts are making the app easy and exciting to use.\n\nI'm happy to hook you up here:\n\n#alpha${twitterProfile?.public_code}\n\n`;
      }

      window.open(
        `https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(
          content,
        )}`,
        '_blank',
      );

      // gaEventTracker(
      //   AlphaActions.PostTweetVerifyTw,
      //   JSON.stringify({
      //     info: {
      //       twitter_username: twitterProfile?.twitter_username,
      //     },
      //   }),
      // );

      setTimeout(() => {
        setSubmitting(false);
      }, 60000 * 2);
    } catch (e) {
      // showError({
      //   ...getErrorMessageContract(e),
      // });
      console.log('IssueFormContainer', e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={s.formContainer}>
      <p className={s.formTitle}>
        {hasLinkTwitter ? (
          'Verified successfully!'
        ) : (
          <div>
            What is your
            <Image
              src={`${CDN_URL_ICONS}/TwitterIcon.png`}
              alt={'TwitterIcon'}
              width={32}
              height={32}
            />
            username
          </div>
        )}
      </p>
      <div className={s.formWrapper}>
        <Form onSubmit={onSubmit} initialValues={{}}>
          {({ handleSubmit }: any) => (
            <IssueForm
              handleSubmit={handleSubmit}
              ref={refForm}
              submitting={submitting}
              hasLinkTwitter={hasLinkTwitter}
              onClose={onClose}
              setShowTrouble={setShowTrouble}
            />
          )}
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
