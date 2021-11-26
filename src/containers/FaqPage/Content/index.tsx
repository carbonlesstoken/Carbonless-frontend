import { FunctionalComponent, h } from "preact";
import { observer } from "mobx-react-lite";

import { faqData } from "../faqMock";
import Container from "../Container";

import styles from "./styles.scss";

const Content: FunctionalComponent = observer(() => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <h1 className={styles.title}>FAQ</h1>
        <ul className={styles.faqList}>
          {faqData.map(({ title, content }) => {
            return (
              <li key={title}>
                <Container title={title} content={content} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});

export default Content;
