import 'katex/dist/katex.min.css';
import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import s from './ProblemTemplate.module.scss';
import cn from 'classnames';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PROBLEM_MAPPING } from '../ProblemData';

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

const ProblemTemplate = ({ topic }: Props) => {
  const content = PROBLEM_MAPPING[topic];

  if (!content) {
    return null;
  }

  return (
    <div className={cn(s.wrapper, 'problem-panel')}>
      <MarkdownComponent>{content}</MarkdownComponent>
    </div>
  );
};

export default ProblemTemplate;
