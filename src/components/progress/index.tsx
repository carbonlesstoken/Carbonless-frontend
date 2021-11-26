import {FunctionalComponent, h} from 'preact';
import style from '../project-info/style.scss';
import {useMst} from "../../store/store";
import {observer} from "mobx-react-lite";
import {useCallback, useEffect, useRef, useState} from "preact/hooks";
import { useFetchTokenSold } from '../../hook';
import crowdsaleAbi from '../../appConstants/contractAbi/crowdsaleAbi.json';
import { crlTotalSupply, miliSecondsInDay, softCapThreshold } from '../../appConstants';
import cx from 'classnames';
import { getSpacedNumber, getTokenAmountDisplay } from '../../utils';
import config from '../../config';
import { Networks } from '../../constants/networks';
import NotificationModal from "../../containers/NotificationModals";
import { TNullable } from '../../types';
import { useWalletConnectorContext } from '../../contexts/WalletConnect';

const PROGRESS_BAR_WIDTH_THRESHOLD = 100;
const {ADDRESSES, IS_MAINNET_OR_TESTNET} = config;
const addresses = ADDRESSES[IS_MAINNET_OR_TESTNET];

const Progress: FunctionalComponent = observer(() => {
    const {web3Provider} = useWalletConnectorContext();
    console.log(web3Provider, 'PROGRESS AFTE INIT');
    const {user, crlToken, notificationModal} = useMst();
    const {isOpen, type, result, open, close, func} = notificationModal;
    const [days, setDays] = useState(0);
    const [isProgressWideEnough, setProgressWideEnough] = useState(false);
    const [transactionHash, setTransactionHash] = useState('');
    const currentTime = Math.ceil(new Date().getTime() / 1000);

    const { sold, lockedTokens, setLockedTokens } = useFetchTokenSold(user.address);

    const progressBarRef = useRef<TNullable<HTMLDivElement>>(null);
    
    const daysHandler = useCallback(() => {
        const endDate = +crlToken.endTime * 1000;
        const startDate = new Date().getTime();
        const result = Math.ceil((endDate - startDate) / miliSecondsInDay);
        setDays(result)
    }, [crlToken.endTime])

    useEffect(() => {
        daysHandler();
    }, [crlToken.endTime])

    const isRedeemActive = user.address && lockedTokens > 0;
    const isRefundActive = sold < softCapThreshold && days === 0 && user.address && lockedTokens > 0;

    const redeemTokens = useCallback(async () => {
        console.log('IN REDEEM', 1);
        notificationModal.setFunc('redeemTokens')
        const presaleAddress = ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRLPresale;
        try {
            console.log('IN REDEEM', 2);
            open();
            notificationModal.setType('send')
            notificationModal.setResult('pending')
            console.log('IN REDEEM', 3, web3Provider, 123);
            const presaleContract = new web3Provider.web3Provider.eth.Contract(crowdsaleAbi, presaleAddress);
            console.log('IN REDEEM', 4);
            await presaleContract.methods.redeem().send({ from: user.address }).then((r) => {
                setTransactionHash(r.transactionHash)
                console.log(r.transactionHash)
                notificationModal.setResult('success');
                setLockedTokens(0)

            });
        } catch (e) {
            console.log(e)
            notificationModal.setResult('reject')
        }

    }, [web3Provider]);

    const refundTokens = useCallback(async () => {
        notificationModal.setFunc('refundTokens')
        try {
            open();
            notificationModal.setType('send')
            notificationModal.setResult('pending')
            console.log(web3Provider, 'WEB3', 123123);
            const presaleContract = new web3Provider.web3Provider.eth.Contract(crowdsaleAbi, ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRLPresale);
            await presaleContract.methods.refund().send({ from: user.address }).then((r) => {
                setTransactionHash(r.transactionHash)
                console.log(r.transactionHash)
                notificationModal.setResult('success');
                setLockedTokens(0)
            });
        } catch (e) {
            notificationModal.setResult('reject')
        }
    }, [web3Provider]);

    useEffect(() => {
        if (progressBarRef && progressBarRef.current) {
            setProgressWideEnough(progressBarRef?.current?.offsetWidth >= PROGRESS_BAR_WIDTH_THRESHOLD);
        }
    }, [sold]);

    console.log(sold, 123123);

    return (
        <div className={style['info__block-bottom_card_2']}>
            <div className={style['info__block-bottom_card_2_content']}>
                <div className={style['info__block-bottom_card_2_content_time']}>
                    <img className={style['info__block-bottom_card_2_content_time_desktop']} src='../../assets/img/icons/back-in-time-icon.png' alt='back in time icon' />
                    <img className={style['info__block-bottom_card_2_content_time_mobile']} src='../../assets/img/back-in-time-mobile.png' alt='back in time icon' />
                    {crlToken.endTime !== '0' && +crlToken.endTime >= currentTime && <h2>
                        <span>{`${days > 0 ? days : 1} ${days === 1 ? 'day ' : 'days '}`}</span> left
                    </h2>}
                    {crlToken.endTime === '0' && <h2>
                        Begin soon
                    </h2>}

                    {(+crlToken.endTime <= currentTime && crlToken.endTime !== '0') && <h2>
                            Closed
                        </h2>}
                </div>
                <div className={style['info__block-bottom_card_2_content_point']}>
                    <h2>Soft cap</h2>
                    <h3>{getSpacedNumber(softCapThreshold.toString())} CRL</h3>
                    <h3>|</h3>
                </div>
                <div className={style.soldAndProgressWrapper}>
                    <div className={style.soldNumberBlock}>
                        <h4>Sold</h4>
                        <h4>{getSpacedNumber(sold.toString())} CRL</h4>
                    </div>
                    <div className={style['info__block-bottom_card_2_content_progress']}>
                        <div ref={progressBarRef} style={{ width: crlTotalSupply ? `${(100 / crlTotalSupply) * sold}%` : '0%', }} className={style['info__block-bottom_card_2_content_progress_scale']} />
                    </div>
                </div>
                <svg style="visibility: hidden;" width="0" height="0" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <defs>
                        <filter id="round">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>
                    </defs>
                </svg>

                <div className={style['info__block-bottom_card_2_content_goals']}>
                    <div>
                        <h2>|</h2>
                        <h2>Soft cap</h2>
                        <h3>{getSpacedNumber(softCapThreshold.toString())} CRL</h3>
                    </div>

                    <div>
                        <h2>|</h2>
                        <h2>Hard Cap</h2>
                        <h3>{getSpacedNumber(crlTotalSupply.toString())} CRL</h3>
                    </div>

                </div>

                {(isRedeemActive || isRefundActive) && <div className={style['info__block-bottom_card_2_content_footer']}>
                    <h2 className={style['info__block-bottom_card_2_content_footer_title']}>After you buy CRL tokens
                        they are locked on the Contract. If Soft Cap isn`t collected until the
                        end of the token sale you will be able to refund your BNB, BUSD or USDT. If you want to withdraw
                        your tokens now please press redeem button. NOTE: if you do that you won`t be able to get a
                        refund.</h2>
                    <div className={style.refundRedeemBlock}>
                        {isRedeemActive && <div className={style['info__block-bottom_card_2_content_footer_balance']}>
                            <h2 className={style['info__block-bottom_card_2_content_footer_balance_title']}>
                                Your locked CRL balance is
                            </h2>
                            <h3 className={style['info__block-bottom_card_2_content_footer_balance_desc']}>{getTokenAmountDisplay(lockedTokens.toString(), 9)} CRL</h3>

                            <div className={cx({[style.redeemDisabled]: !isRedeemActive})} onClick={redeemTokens}>
                                <h3>Redeem</h3>
                                <img src='../../assets/img/rectangle-button.png' alt='button' />
                            </div>
                        </div>}
                        {isRefundActive && <div className={style['info__block-bottom_card_2_content_footer_balance']}>
                            <h2 className={style['info__block-bottom_card_2_content_footer_balance_title']}>You will get your BNB, USDT, BUSD</h2>

                            <div className={cx({[style.redeemDisabled]: !isRefundActive})} onClick={refundTokens}>
                                <h3>Refund</h3>
                                <img src='../../assets/img/rectangle-button.png' alt='button' />
                            </div>
                        </div>}
                    </div>
                </div>}
            </div>
            {(type && result ) && (func === 'redeemTokens' || func === 'refundTokens') ? <NotificationModal close={close} isOpen={isOpen} result={result} type={type} redeemTokens={redeemTokens} refundTokens={refundTokens} transactionHash={transactionHash} /> : ''}
        </div>
    );
})

export default Progress;