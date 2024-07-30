import React, { PropsWithChildren, useState } from 'react';
import s from './Problems.module.scss';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react';
import SubmitProblem from '../SubmitProblem';
import IcThreeDots from '@/public/hackathon/ic-three-dots.svg';
import ProblemTemplate from './Template';

const Problems = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <IcThreeDots />
      </div>
      <div className={s.body}>
        <Tabs variant="soft-rounded" onChange={(index) => setTabIndex(index)}>
          <TabList p="10px" mb="8px" gap="3px">
            <Tab>Topic 1</Tab>
            <Tab>Topic 2</Tab>
            <Tab>Topic 3</Tab>
          </TabList>
          <TabPanels p="10px 16px">
            <TabPanel>
              <ProblemTemplate topic="1" />
            </TabPanel>
            <TabPanel>
              <ProblemTemplate topic="2" />
            </TabPanel>
            <TabPanel>
              <ProblemTemplate topic="3" />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <div className={s.footer}>
        <p>Submit Form here</p>
        {/* TODO: Submit form here */}
        <SubmitProblem code={tabIndex} />
      </div>
    </div>
  );
};

export default Problems;
