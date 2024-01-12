/* eslint-disable react/display-name */
/* eslint-disable react/no-children-prop */

import React, { forwardRef, useCallback, useEffect, useState } from 'react';
import cs from 'classnames';
import s from './IssueForm.module.scss';
import { Field, useForm, useFormState } from 'react-final-form';
// import { composeValidators, required } from "@/utils/form-validate";
import debounce from 'lodash/debounce';
// import { formatName } from "@/utils";
import { requestAuthenByUserName } from '@/services/player-share';
// import CreateOrImportWallet from "@/modules/AlphaPWA/Welcome/CreateOrImportWallet";
// import useAnalyticsEventTracker, { AlphaActions } from "@/utils/ga";
import { getReferralCodeByTwId } from '@/services/referral';
import { formatName } from '@/utils/string';
import { ITwitterProfile } from '@/interfaces/twitter_profile';
import Image from 'next/image';
import { CDN_URL_ICONS } from '@/config';
import { composeValidators, required } from '@/utils/form-validate';
import UsernameInput from './UsernameInput';
import Avatar from '@/components/Avatar';
import CreateOrImportWallet from '../../CreateOrImportWallet';
import { Spinner } from '@chakra-ui/react';
// import Spinner from '@/components/Spinner';

const IssueForm: React.FC<any> = forwardRef(
  (
    { handleSubmit, submitting, hasLinkTwitter, onClose, setShowTrouble }: any,
    ref: any,
  ) => {
    const [loading, setLoading] = useState(false);

    const [twitterProfile, setTwitterProfile] =
      useState<ITwitterProfile | null>(null);
    const { change } = useForm();
    const { values } = useFormState();
    const [hasInput, setHasInput] = useState(false);

    // const gaEventTracker = useAnalyticsEventTracker();

    const onChangeTwitterUserName = (username: any) => {
      setHasInput(true);
      onTwitterUserNameChange({
        username: username,
      });
    };

    const onTwitterUserNameChange = useCallback(
      debounce((p) => {
        return handleBaseAmountChange(p);
      }, 2000),
      [],
    );

    const handleBaseAmountChange = async ({
      username,
    }: {
      username: string;
    }) => {
      try {
        setLoading(true);
        setTwitterProfile(null);
        setShowTrouble(false);
        change('twitterProfile', null);
        const res: any = await requestAuthenByUserName(username);

        setTwitterProfile(res);
        change('twitterProfile', res);

        if (!!res) {
          setShowTrouble(true);
        }

        const referralCode = await getReferralCodeByTwId({
          twitter_id: res?.twitter_id,
        });

        change('referralCode', referralCode);

        // gaEventTracker(
        //   AlphaActions.EnterUsernameVerifyTw,
        //   JSON.stringify({
        //     info: {
        //       twitter_username: res?.twitter_username,
        //     },
        //   })
        // );
      } catch (err: any) {
        console.log('handleBaseAmountChange err', err);
      } finally {
        setLoading(false);
        setHasInput(false);
      }
    };

    const btnDisable = submitting || loading || !twitterProfile;

    useEffect(() => {
      // disable enter keypress if no twitter profile
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const handleEnter = (e: any) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
        window.addEventListener('keypress', handleEnter);
        return () => {
          window.removeEventListener('keypress', handleEnter);
        };
      };
    }, []);

    return (
      <form onSubmit={handleSubmit} ref={ref}>
        <div
          // label={"Enter your X username below."}
          className={cs(s.inputAmountWrap)}
        >
          <Field
            name="username"
            children={UsernameInput}
            validate={composeValidators(required)}
            fieldChanged={onChangeTwitterUserName}
            disabled={submitting || loading || hasLinkTwitter}
            placeholder={`X username`}
            className={cs(s.inputAmount)}
            borderColor={'#ECECED'}
            maxlength={50}
          />
        </div>
        {loading ? (
          <div className={s.loading}>
            <Spinner color={'white'} />
          </div>
        ) : (
          <>
            {twitterProfile && (
              <div className={s.container}>
                <div className={cs(s.wrapTwitter)}>
                  <div className={s.profile_detail}>
                    <Avatar
                      url={twitterProfile?.twitter_avatar || ''}
                      address={twitterProfile?.twitter_username || ''}
                      width={40}
                    />
                    <div className={s.profile_name}>
                      <p>
                        {formatName(twitterProfile?.twitter_name || '', 40)}
                      </p>
                      <p>@{twitterProfile?.twitter_username}</p>
                    </div>
                  </div>
                </div>

                {twitterProfile?.issued ? (
                  <div className={s.profile_warning__hadAccount}>
                    <p>You already had an Alpha account.</p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
            {!!values.username && !twitterProfile && !hasInput && (
              <p className={s.profile_warning__notExist}>
                This account doesn’t exist on X.
              </p>
            )}
          </>
        )}
        {hasLinkTwitter ? (
          <CreateOrImportWallet
            onClose={onClose}
            twitterProfile={twitterProfile}
          />
        ) : (
          <>
            {!!twitterProfile && (
              <div className={s.cta}>
                <button
                  type="submit"
                  disabled={btnDisable}
                  className={s.btnSubmit}
                >
                  {submitting ? (
                    <Spinner color={'black'} />
                  ) : (
                    <div className={s.cta_content}>
                      Post on
                      <Image
                        src={`${CDN_URL_ICONS}/TwitterIcon.png`}
                        alt={'TwitterIcon'}
                        width={20}
                        height={20}
                      />
                      to sign in
                    </div>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </form>
    );
  },
);

export default IssueForm;
