import 'katex/dist/katex.min.css';
import { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import s from './styles.module.scss';

const MarkdownComponent = ({
  text,
  delay = 10,
}: {
  text: string;
  delay?: number;
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return (
    <div className={s.markdown}>
      <Markdown>{currentText}</Markdown>
    </div>
  );
};

export default MarkdownComponent;
