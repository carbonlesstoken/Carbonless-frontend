import { Fragment, FunctionalComponent, h } from "preact";
import { useState } from "preact/hooks";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import {
  About,
  Addresses,
  BuyNow,
  PopupPreloader,
  ProjectInfo,
  Team,
} from "../../../components";
// import { useMst } from "../../store/store";

const {
  default: arrowIconSvg,
} = require("../../../assets/img/icons/vertical-arrow-icon.svg");

import styles from "./styles.scss";

interface IContainerProps {
  className?: string;
  title: string;
  content: string;
}

const _Container: FunctionalComponent<IContainerProps> = ({
  title,
  content,
}) => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleContent = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div className={cn(styles.container, {
      [styles.containerActive]: isOpened,
    })}>
      <div className={styles.header} onClick={toggleContent}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.toggleButton}
          type="button"
        >
          <img
            className={cn(styles.arrowImage, {
              [styles.arrowImageActive]: isOpened,
            })}
            src={arrowIconSvg}
            alt="vertical arrow"
          />
        </button>
      </div>
      <div
        className={cn(styles.contentWrapper, {
          [styles.contentWrapperActive]: isOpened,
        })}
      >
        <div
          className={cn(styles.content, {
            [styles.contentActive]: isOpened,
          })}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </div>
  );
};

const Container = observer(_Container);

export default Container;
