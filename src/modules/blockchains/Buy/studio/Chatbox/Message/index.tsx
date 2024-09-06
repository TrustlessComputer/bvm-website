import { IModelCategory } from '@/types/customize-model';
import { useCallback, useEffect, useRef, useState } from 'react';
import Lego from '../../../component4/Lego';
import useTemplate from '../../../hooks/useTemplate';
import useChatBoxState, { ChatBoxStatus } from '../chatbox-store';
import styles from './styles.module.scss';

export default function Message({
  beforeJSON,
  template,
  afterJSON,
  onUpdateScroll,
}: {
  beforeJSON: string;
  template: IModelCategory[];
  afterJSON: string;
  onUpdateScroll: () => void;
}) {
  const { setChatBoxStatus, isGenerating, prepareCategoryTemplate } =
    useChatBoxState((state) => state);
  const { setTemplate } = useTemplate();

  const [isRendered, setIsRendered] = useState(false);

  const refRender = useRef<NodeJS.Timeout>();
  const [displayedBeforeJSON, setDisplayedBeforeJSON] = useState<string>('');
  const [displayedAfterJSON, setDisplayedAfterJSON] = useState<string>('');
  const [displayedTemplate, setDisplayedTemplate] = useState<typeof template>(
    [],
  );

  const refBeforeJSONRender = useRef<string>('');
  const refAfterJSONRender = useRef<string>('');

  const animateMessage = useCallback(() => {
    let beforeJSONIndex = 0;
    let afterJSONIndex = 0;
    let templateIndex = 0;
    let optionIndex = 0;

    refRender.current = setInterval(() => {
      if (beforeJSONIndex < beforeJSON.length) {
        refBeforeJSONRender.current += beforeJSON[beforeJSONIndex];
        setDisplayedBeforeJSON(refBeforeJSONRender.current);
        beforeJSONIndex++;
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
      } else if (afterJSONIndex < afterJSON.length) {
        refAfterJSONRender.current += afterJSON[afterJSONIndex];
        setDisplayedAfterJSON(refAfterJSONRender.current);
        afterJSONIndex++;
      } else {
        refRender.current && clearInterval(refRender.current);
        setIsRendered(true);
        setChatBoxStatus({
          status:
            prepareCategoryTemplate.length > 0
              ? ChatBoxStatus.Complete
              : ChatBoxStatus.Close,
          isGenerating: false,
          isComplete: prepareCategoryTemplate.length > 0,
          isListening: false,
        });
      }
      onUpdateScroll();
    }, 30);
  }, [beforeJSON, template, afterJSON]);

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
      <div>{displayedBeforeJSON}</div>

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

      <div>{displayedAfterJSON}</div>

      {isRendered && (
        <div className={styles.applyBtn} onClick={() => setTemplate(template)}>
          Apply
        </div>
      )}
    </div>
  );
}
