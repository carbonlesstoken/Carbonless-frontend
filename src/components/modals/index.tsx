import {FunctionalComponent, h} from 'preact';
import style from './style.scss';
import {useCallback, useEffect, useRef} from "preact/hooks";

interface ModalConnectedProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    isModalOpen: boolean;
    title: string;
    icon?: string;
    bg?: string;
}

const ModalConnected: FunctionalComponent<ModalConnectedProps> = ({setIsModalOpen, isModalOpen, title, icon, bg}) => {
    const ref = useRef<HTMLHeadingElement>(null);

    const modalHandler = useCallback((): void => {
        setIsModalOpen(false)
    }, [])

    useEffect(() => {
        const checkIfClickedOutside = (e: any): void => {
            if (isModalOpen && ref.current && !ref.current.contains(e.target)) {
                setIsModalOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return (): void => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isModalOpen])

    return (
        <div ref={ref} className={`${style.modal}`}>
            <img className={style['modal__img']} src={icon} alt='modal connected' />
            <h2>{title}</h2>
            <img onClick={modalHandler} className={style['modal__close']} src='../../assets/img/icons/close-icon.png' alt='close-icon' />
            <img className={style['modal__bg']} src={bg} alt='modal' />
        </div>
    );
};

export default ModalConnected;