import { IModelCategory } from '@/types/customize-model';
import { useCallback, useEffect, useRef, useState } from 'react';
import Lego from '../../../component4/Lego';
import useTemplate from '../../../hooks/useTemplate';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import styles from './styles.module.scss';

export default function Message({
  message,
  template,
  onUpdateScroll,
}: {
  message: string;
  template: IModelCategory[];
  onUpdateScroll: () => void;
}) {
  const { setChatBoxStatus, isGenerating, prepareCategoryTemplate } =
    useChatBoxState((state) => state);
  const { setTemplate } = useTemplate();

  const [isRendered, setIsRendered] = useState(false);

  const refRender = useRef<NodeJS.Timeout>();
  const [displayedMessage, setDisplayedMessage] = useState<string>('');
  const [displayedTemplate, setDisplayedTemplate] = useState<typeof template>(
    [],
  );

  const refTextRender = useRef<string>('');

  const animateMessage = useCallback(() => {
    let messageIndex = 0;
    let templateIndex = 0;
    let optionIndex = 0;

    refRender.current = setInterval(() => {
      if (messageIndex < message.length) {
        refTextRender.current += message[messageIndex];
        setDisplayedMessage(refTextRender.current);
        messageIndex++;
      } else if (templateIndex < template.length) {
        const currentTemplate = template[templateIndex];

        if (optionIndex < currentTemplate.options.length) {
          setDisplayedTemplate((prev) => {
            const updatedTemplate = [...prev];

            if (!updatedTemplate[templateIndex]) {
              updatedTemplate[templateIndex] = {
                ...currentTemplate,
                options: [currentTemplate.options[optionIndex]],
              };
            } else {
              updatedTemplate[templateIndex].options.push(
                currentTemplate.options[optionIndex],
              );
            }

            optionIndex++;

            return updatedTemplate;
          });
        } else {
          templateIndex++;
          optionIndex = 0;
        }
      } else {
        refRender.current && clearInterval(refRender.current);
        setIsRendered(true);
        setChatBoxStatus({
          status:
            prepareCategoryTemplate.length > 0 ? ChatBoxStatus.Complete : '',
          isGenerating: false,
          isComplete: prepareCategoryTemplate.length > 0,
          isListening: false,
        });
      }
      onUpdateScroll();
    }, 30);
  }, [message, template]);

  useEffect(() => {
    if (isRendered) return;

    if (isGenerating) {
      animateMessage();
    } else {
      setIsRendered(true);
      refRender.current && clearInterval(refRender.current);
    }
  }, [isGenerating]);

  return (
    <div className={styles.message}>
      <div>{displayedMessage}</div>

      <div className={styles.categories}>
        {displayedTemplate.map((item) => (
          <div key={item.id} className={styles.category}>
            <h6 className={styles.categoryTitle}>Generated {item.title}</h6>

            <div className={styles.categoryOptions}>
              {item.options.map((option) => (
                <Lego
                  {...option}
                  background={item.color}
                  key={option.key}
                  titleInLeft
                  titleInRight={false}
                  first={false}
                  last={false}
                  legoAI
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {isRendered && (
        <div className={styles.applyBtn} onClick={() => setTemplate(template)}>
          Apply
        </div>
      )}
    </div>
  );
}
