import { FunctionalComponent, h } from 'preact';
import { useRef, useCallback, useEffect } from 'preact/hooks';
import { observer } from 'mobx-react-lite';
import cns from 'classnames';

import s from './style.module.scss';
import {useMst} from "../../store/store";

export const Modal: FunctionalComponent = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { modal } = useMst();
  const { isOpen, text, header, delay, noCloseButton, fullPage } = modal;

  const handleClose = useCallback(() => {
    modal.close();
  }, [modal]);

  const handleClickOutside = useCallback(
    (e: any) => {
      if (e.target === ref.current) {
        modal.close();
      }
    },
    [modal],
  );

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [handleClickOutside]);

  useEffect(() => {
    if (delay) {
      const timeout = setTimeout(handleClose, delay);
      return () => clearTimeout(timeout);
    }
  }, [handleClose, delay, isOpen]);

  return (
    <div className={cns(modal.isOpen ? s.modalOpen : s.modalClosed)} ref={ref}>
      <img src='../../assets/img/rectangle-disconnect.png' alt='bg' />
      <div className={cns(s.modalContainer, fullPage && s.modalContainerFullPage)}>
        {!noCloseButton && <img src="../../assets/img/icons/close.svg" onClick={handleClose} className={s.modalClose} />}
        <div className={s.modalHeader}>{header}</div>
        {text}
      </div>
    </div>
  );
};

export default observer(Modal);
