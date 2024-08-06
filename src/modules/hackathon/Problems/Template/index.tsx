import 'katex/dist/katex.min.css';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import { PROBLEM_1_MARKDOWN } from './problem_1';
import s from './ProblemTemplate.module.scss';
import { PROBLEM_2_MARKDOWN } from './problem_2';
import { PROBLEM_3_MARKDOWN } from './problem_3';
import cn from 'classnames';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';

// // @ts-ignore
// import GCD from 'raw-loader!./1_GCD.md';
// // @ts-ignore
// import ArraySort from 'raw-loader!./2_ArraySort.md';
// // @ts-ignore
// import Library from 'raw-loader!./3_Library.md';

type Props = {
  topic: string;
};

const MarkdownComponent = ({ children }: { children: string }) => {
  return (
    <div className={s.markdown}>
      <Markdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code(props) {
            const { children, className, node, ...rest } = props;
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              // @ts-ignore
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                style={nightOwl}
              />
            ) : (
              <code {...rest} className={className}>
                {children}
              </code>
            );
          },
        }}
      >
        {children}
      </Markdown>
    </div>
  );
};

const Problem_01 = () => {
  return <MarkdownComponent>{PROBLEM_1_MARKDOWN}</MarkdownComponent>;
};

const Problem_02 = () => {
  return <MarkdownComponent>{PROBLEM_2_MARKDOWN}</MarkdownComponent>;
};

const Problem_03 = () => {
  return <MarkdownComponent>{PROBLEM_3_MARKDOWN}</MarkdownComponent>;
};

const ProblemTemplate = ({ topic }: Props) => {
  return (
    <div className={cn(s.wrapper, 'problem-panel')}>
      {topic === '1' && <Problem_01 />}
      {topic === '2' && <Problem_02 />}
      {topic === '3' && <Problem_03 />}
    </div>
  );
};

export default ProblemTemplate;
