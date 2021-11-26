import {FunctionalComponent, h} from 'preact';
import style from './style.scss';
import {useCallback, useEffect, useRef} from "preact/hooks";

interface ModalConnectedProps {
    setIsModalOpen: (isModalOpen: boolean) => void;
    isModalOpen: boolean;
}

const ModalDisconnect: FunctionalComponent<ModalConnectedProps> = ({setIsModalOpen, isModalOpen}) => {

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
        <div ref={ref} className={style['modal__disconnect']}>
            <h2>If you want to disconnect your wallet please delete {window.location.hostname} from connected sites in your wallet provider</h2>
            <img onClick={modalHandler} className={style['modal__disconnect_close']} src='../../assets/img/icons/close-icon.png' alt='close icon' />
            <div onClick={modalHandler}>
                <h3>OK</h3>
                <img src='../../assets/img/ok-button.png' alt='close icon' />
            </div>
            <img className={style['modal__disconnect_bg']} src='../../assets/img/rectangle-disconnect.png' alt='bg' />
        </div>
    );
};

export default ModalDisconnect;