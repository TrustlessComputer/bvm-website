import styles from './styles.module.scss';

export default function LabelListening() {
  return (
    <div className={styles.listeningOverlay}>
      {/*<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
      {/*  <path d="M12 20C11.45 20 11 19.55 11 19V5C11 4.45 11.45 4 12 4C12.55 4 13 4.45 13 5V19C13 19.55 12.55 20 12 20Z"*/}
      {/*        fill="black" />*/}
      {/*  <path*/}
      {/*    d="M7 18.4405C6.45 18.4405 6 17.9905 6 17.4405V6.56055C6 6.01055 6.45 5.56055 7 5.56055C7.55 5.56055 8 6.01055 8 6.56055V17.4505C8 18.0005 7.55 18.4505 7 18.4505V18.4405Z"*/}
      {/*    fill="black" />*/}
      {/*  <path*/}
      {/*    d="M21 16.1106C20.45 16.1106 20 15.6606 20 15.1106V8.89063C20 8.34063 20.45 7.89062 21 7.89062C21.55 7.89062 22 8.34063 22 8.89063V15.1106C22 15.6606 21.55 16.1106 21 16.1106Z"*/}
      {/*    fill="black" />*/}
      {/*  <path*/}
      {/*    d="M3 16.1106C2.45 16.1106 2 15.6606 2 15.1106V8.89063C2 8.34063 2.45 7.89062 3 7.89062C3.55 7.89062 4 8.34063 4 8.89063V15.1106C4 15.6606 3.55 16.1106 3 16.1106Z"*/}
      {/*    fill="black" />*/}
      {/*  <path*/}
      {/*    d="M17 18.4405C16.45 18.4405 16 17.9905 16 17.4405V6.56055C16 6.01055 16.45 5.56055 17 5.56055C17.55 5.56055 18 6.01055 18 6.56055V17.4505C18 18.0005 17.55 18.4505 17 18.4505V18.4405Z"*/}
      {/*    fill="black" />*/}
      {/*</svg>*/}
      <svg width="24px" height="24px" viewBox="0 0 10 8" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <g id="Audio" transform="translate(0.000000, 0.500000)" stroke="black" stroke-width="0.8"
           fill-rule="evenodd"
           stroke-linecap="round">
          <line x1="8.5" y1="0.493135" x2="8.5" y2="6.50687" id="Line-5">
            <animate attributeType="XML" attributeName="y1" values="2;0;2" keyTimes="0;0.5;1" dur=".8s"
                     repeatCount="indefinite"></animate>
            <animate attributeType="XML" attributeName="y2" values="5;7;5" keyTimes="0;0.5;1" dur=".8s"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="6.5" y1="0.789016" x2="6.5" y2="6.21098" id="Line-4">
            <animate attributeType="XML" attributeName="y1" values="0;2;0" keyTimes="0;0.5;1" dur=".5s"
                     repeatCount="indefinite"></animate>
            <animate attributeType="XML" attributeName="y2" values="7;5;7" keyTimes="0;0.5;1" dur=".5s"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="4.5" y1="1.67582" x2="4.5" y2="5.32418" id="Line-3">
            <animate attributeType="XML" attributeName="y1" values="1;3;1" keyTimes="0;0.5;1" dur=".6s"
                     repeatCount="indefinite"></animate>
            <animate attributeType="XML" attributeName="y2" values="6;4;6" keyTimes="0;0.5;1" dur=".6s"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="2.5" y1="1.14678" x2="2.5" y2="5.85322" id="Line-2">
            <animate attributeType="XML" attributeName="y1" values="2;1;2" keyTimes="0;0.5;1" dur=".7s"
                     repeatCount="indefinite"></animate>
            <animate attributeType="XML" attributeName="y2" values="5;6;5" keyTimes="0;0.5;1" dur=".7s"
                     repeatCount="indefinite"></animate>
          </line>
          <line x1="0.5" y1="1.67582" x2="0.5" y2="5.32418" id="Line-1">
            <animate attributeType="XML" attributeName="y1" values="3;0;3" keyTimes="0;0.5;1" dur=".9s"
                     repeatCount="indefinite"></animate>
            <animate attributeType="XML" attributeName="y2" values="4;7;4" keyTimes="0;0.5;1" dur=".9s"
                     repeatCount="indefinite"></animate>
          </line>
        </g>
      </svg>
      <span>Listening...</span>
    </div>
  );
}
