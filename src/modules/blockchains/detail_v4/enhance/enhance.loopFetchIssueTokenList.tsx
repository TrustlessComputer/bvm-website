import { useEffect } from 'react';
import { useDAServicesHelper } from '../hook/useDAServicesHelper';

const enhanceLoopFetchIssueTokenList =
  (WrappedComponent: any) => (props: any) => {
    const { chainDetailData } = props;

    const { loopFetchTokenIssueList, clearLoopFetchTokenIssueList } =
      useDAServicesHelper();

    useEffect(() => {
      // console.log(
      //   '--- enhanceLoopFetchIssueTokenList useEffect START --- ',
      //   chainDetailData,
      // );

      if (chainDetailData && chainDetailData.chainId) {
        loopFetchTokenIssueList(chainDetailData?.chainId);
      } else {
        clearLoopFetchTokenIssueList();
      }

      return () => {
        console.log('--- enhanceLoopFetchIssueTokenList useEffect END --- ');
        clearLoopFetchTokenIssueList();
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

export default enhanceLoopFetchIssueTokenList;
