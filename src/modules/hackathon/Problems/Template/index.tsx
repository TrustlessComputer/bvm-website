import 'katex/dist/katex.min.css';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { PROBLEM_1_MARKDOWN } from './problem_1';
import s from './ProblemTemplate.module.scss';
import { PROBLEM_2_MARKDOWN } from './problem_2';
import { PROBLEM_3_MARKDOWN } from './problem_3';

// // @ts-ignore
// import GCD from 'raw-loader!./1_GCD.md';
// // @ts-ignore
// import ArraySort from 'raw-loader!./2_ArraySort.md';
// // @ts-ignore
// import Library from 'raw-loader!./3_Library.md';

type Props = {
  topic: '1' | '2' | '3';
};

const Problem_01 = () => {
  return (
    <div>
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {PROBLEM_1_MARKDOWN}
      </Markdown>
    </div>
  );
};

const Problem_02 = () => {
  return (
    <div>
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {PROBLEM_2_MARKDOWN}
      </Markdown>
    </div>
  );
};

const Problem_03 = () => {
  return (
    <div>
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {PROBLEM_3_MARKDOWN}
      </Markdown>
    </div>
  );
};

const ProblemTemplate = ({ topic }: Props) => {
  return (
    <div className={s.wrapper}>
      {topic === '1' && <Problem_01 />}
      {topic === '2' && <Problem_02 />}
      {topic === '3' && <Problem_03 />}
    </div>
  );
};

export default ProblemTemplate;
