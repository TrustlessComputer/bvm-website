  import styles from './styles.module.scss';

const DisclaimerBox = () => {
  return (
    <div className={styles.thankBox}>
      <span className={styles.thankBox_title}>
        This is an independent project . Launchpad acts purely as a technology platform. All responsibilities related to the launch, how it functions, its credibilities and legalities solely are the project's discretion. As a technology platform, Naka shall bear no responsibililites as to the credibilty, legality, operationality and functionality of the project as well as the use of funds being raised by the project on the launchpad. A project being launched on Naka does not in any manner represent an endorsement of Naka of such project or its owners. Please DYOR and invest at your own risk.
      </span>
    </div>
  );
};

export default DisclaimerBox;
