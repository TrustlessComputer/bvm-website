import React from "react";
import copy from "copy-to-clipboard";

import CopyIcon from "@/public/icons/alpha/ic-copy.svg";
// import useAnalyticsEventTracker, { AlphaActions } from "@/utils/ga";
import s from "./LogInWebOnAndroid.module.scss";
import {removeToast, showSuccess} from "@/components/toast";

const LogInWebOnAndroid: React.FC<{
  link: string;
  setIsClickLinkTwitter: (value: boolean) => void;
  setShowAuthorizeMethod: (value: boolean) => void;
}> = ({
  link,
  setIsClickLinkTwitter,
  setShowAuthorizeMethod,
}): React.ReactElement => {
  // const gaEventTracker = useAnalyticsEventTracker();

  const handleCopyLink = (event: React.MouseEvent) => {
    event?.stopPropagation();
    event.preventDefault();
    setIsClickLinkTwitter(true);
    copy(link);
    removeToast({})
    showSuccess({message: "Copied"})

    // gaEventTracker(AlphaActions.ClickCopyLinkAndroid, link);
  };

  // if (clientOs === ClientOs.Android) {
  return (
    <div className={s.logInWebOnAndroid}>
      {/*<div className={s.lineWrapper}>
        <div className={s.line} />
        <div className={s.lineWrapper_text}>Or</div>
        <div className={s.line} />
      </div>*/}
      <div className={s.linkWrapper}>
        <div
          className={s.linkWrapper_text}
          onClick={() => setShowAuthorizeMethod(false)}
        >
          Have trouble?
        </div>
        <div className={s.link} onClick={handleCopyLink}>
          <div className={s.link_text}>Copy link and paste to your browser</div>
          <CopyIcon />
        </div>
      </div>
    </div>
  );
  // }
};

export default LogInWebOnAndroid;
