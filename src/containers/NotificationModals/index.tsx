import {FunctionalComponent, h} from 'preact';
import s from './style.scss';
import Modal from 'react-modal';

const Pending = '../../assets/img/pending.svg';
const Success = '../../assets/img/success.svg';
const Reject = '../../assets/img/reject.svg';

const wallet = localStorage.getItem('walletType');
const isMetamask = wallet === '"metamask"';

const modalHelperObject = {
    approve: {
        pending: {
            title1: 'STEP 1 /2 ',
            title2: 'APPROVE',
            image: Pending,
            title3: `PLEASE PRESS “APPROVE” BUTTON IN ${isMetamask ? 'METAMASK' : 'WALLET CONNECT'} EXTENSION`,
            body1: 'ERC20 tokens are deployed with functionality that allows other smart contracts to move tokens.',
            body2: 'By approving the smart contracts, it now has permission to execute the peer to peer swapping behavior on your behalf.',
            body3: 'The Spend Limit permission is the total amount of tokens that are able to move when using wallet Swap.',
        },
        success: {
            title1: 'STEP 1 /2 ',
            title2: 'APPROVE',
            image: Success,
            title3: 'APPROVED SUCCESSFULLY. NEXT STEP...',
            body1: 'ERC20 tokens are deployed with functionality that allows other smart contracts to move tokens.',
            body2: 'By approving the smart contracts, it now has permission to execute the peer to peer swapping behavior on your behalf.',
            body3: 'The Spend Limit permission is the total amount of tokens that are able to move when using wallet Swap.',
        },
        reject: {
            title1: 'STEP 1 /2 ',
            title2: 'APPROVE',
            image: Reject,
            title3: `YOU REJECTED APPROVE TRANSACTION IN ${isMetamask ? 'METAMASK' : 'WALLET CONNECT'}. PRESS APPROVE AGAIN TO START OVER OR CLOSE THIS WINDOW.`,
        },
    },
    send: {
        pending: {
            title1: 'STEP 2 /2 ',
            title2: 'SEND',
            image: Pending,
            title3: `PLEASE PRESS “SEND” BUTTON IN ${isMetamask ? 'METAMASK' : 'WALLET CONNECT'} EXTENSION`,
            body1: 'Your ASSETS will be transferred from your wallet to the contract address',
        },
        success: {
            title1: 'STEP 2 /2 ',
            title2: 'SEND',
            image: Success,
            title3: 'SENT',
            body1: 'It takes some time for transaction to get confirmed.',
        },
        reject: {
            title1: 'STEP 2 /2 ',
            title2: 'SEND',
            image: Reject,
            title3: `YOU REJECTED SEND TRANSACTION IN ${isMetamask ? 'METAMASK' : 'WALLET CONNECT'}. PRESS SEND AGAIN TO START OVER OR CLOSE THIS WINDOW.`,
        },
    },
};

interface NotificationProps {
    isOpen: boolean,
    result: string,
    type: string,
    transactionHash?: string,
    handleBuy?: () => void,
    handleTokenBuy?: () => void,
    close?: () => void,
    func?: string,
    redeemTokens?: () => void,
    refundTokens?: () => void,
}

const NotificationModal: FunctionalComponent<NotificationProps> = ({isOpen, result, type, close, transactionHash, handleTokenBuy, handleBuy, func, redeemTokens, refundTokens}) => {

    const sendAgain = () => {
        if (func === "handleTokenBuy") {
            handleTokenBuy()
        }
        if (func === "handleBuy") {
            handleBuy()
        }
        if (func === "redeemTokens") {
            redeemTokens()
        }
        if (func === "refundTokens") {
            refundTokens()
        }
    }
    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={close}
                className={s['modal-container']}
                overlayClassName={s['modal-overlay']}
                ariaHideApp={false}
            >
                <img onClick={close} className={s['close-btn']} src='../../assets/img/icons/close-icon.png' alt='close'/>
                {func === "handleTokenBuy" ? <h2
                    className={s['modal-container_title']}>{modalHelperObject[type][result]?.title1}<span>{modalHelperObject[type][result]?.title2}</span>
                </h2> : ''}
                <div className={s['whiteCircle']}>
                    <img className={result === 'pending' ? s.pending : ''} src={modalHelperObject[type][result]?.image}
                         alt=""/>
                    <h2>{result}</h2>
                </div>
                <h2 className={s['modal-container_body']}>{modalHelperObject[type][result]?.title3}</h2>
                <div className={s['modal-container_instructions']}>
                    <h3 style={(type === 'send' && result === 'success') ? {textAlign: 'center'} : ''}
                        className={s['modal-container_instruction']}>
                        {modalHelperObject[type][result]?.body1}
                    </h3>
                    <h3 className={s['modal-container_instruction']}>
                        {modalHelperObject[type][result]?.body2}
                    </h3>
                    <h3 className={s['modal-container_instruction']}>
                        {modalHelperObject[type][result]?.body3}
                    </h3>
                </div>

                {(result === 'success' && type === 'send' && transactionHash) && (
                    <button className={s['scannerBtn']}>
                        <a target="_blank" name="See on scanner"
                           href={`https://testnet.bscscan.com/tx/${transactionHash}`}>See on scanner</a>
                    </button>
                )}
                {result === 'reject' && (
                    //@ts-ignore
                    <button onClick={sendAgain} className={s['scannerBtn']}>
                        <a>{`${type} again`}</a>
                    </button>
                )}
            </Modal>
        </div>
    );
};

export default NotificationModal;
