import {Fragment, FunctionalComponent, h} from 'preact';
import style from './style.scss';
import {observer} from "mobx-react-lite";
import {useMst} from "../../store/store";
import {useCallback, useEffect, useRef, useState} from "preact/hooks";
import {BuyInfo, ModalConnected, OnRamper} from "../index";
import CrowdsaleForm from "./crowdsale-form";
import {setToStorage} from "../../utils/localStorage";
import {useOnClickOutside} from "../../hook/useOnClickOutside";
import config from "../../config";
import {useFetchTokens, useFetchTokenSold} from "../../hook";
import {useFetchCRLPrice} from "../../hook/useFetchCrlPrice";
import {useFetchEndTime} from "../../hook/useFetchEndTime";

const {ADDRESSES, IS_MAINNET_OR_TESTNET} = config;
const addresses = ADDRESSES[IS_MAINNET_OR_TESTNET];

const BuyNow: FunctionalComponent = observer(() => {
    const { user, wallet, crlToken } = useMst();

    // const {web3Provider} = useWalletConnectorContext();

    const [activeTab, setActiveTab] = useState<number>(0);
    const isActiveTabCrowdsale = activeTab === 0;

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isMenuWalletSelectionOpen, setIsMenuWalletSelectionOpen] = useState<boolean>(false);

    const tokens = useFetchTokens();
    // @ts-ignore
    const { crlPrice } = useFetchCRLPrice();
    const { endTime } = useFetchEndTime();
    const { sold } = useFetchTokenSold(user.address);

    console.log('crlPrice: ', crlPrice, 'endTime: ', endTime, 'sold: ', sold)

    const refMenu = useRef<HTMLHeadingElement>(null);
    const refHead = useRef<HTMLHeadingElement>(null);
    const refMenuWalletSelection = useRef<HTMLHeadingElement>(null);

    useOnClickOutside([refMenuWalletSelection], () => setIsMenuWalletSelectionOpen(false));

    const tabHandler = useCallback((tab: number): void => {
        setActiveTab(tab)
    }, [])

    const menuHandler = useCallback((): void => {
        setIsMenuOpen(!isMenuOpen)
    }, [isMenuOpen])

    const checkIfClickedOutside = useCallback((e: any): void => {
        if (isMenuOpen && refMenu.current && !refMenu.current.contains(e.target) && refHead.current && !refHead.current.contains(e.target)) {
            menuHandler()
        }
    }, [isMenuOpen])

    useEffect(() => {
        document.addEventListener("mousedown", checkIfClickedOutside)

        return (): void => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    const handleMetamaskLogin = useCallback(async () => {
        setToStorage('walletType', 'metamask');
        wallet.setWalletType('metamask');
        setIsMenuWalletSelectionOpen(false);
    }, [wallet]);

    const handleWalletConnectLogin = useCallback(async () => {
        setToStorage('walletType', 'walletConnect');
        wallet.setWalletType('walletConnect');
        setIsMenuWalletSelectionOpen(false);
    }, [wallet]);

    // const getEndTime = async () => {
    //     try {
    //         const contract = await createContract(ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRLPresale, crowdsaleAbi as AbiItem[]);
    //         const result = await contract.methods.endTime().call();
    //         crlToken.setTokenEndTime(result)
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    return (
        <div className={`${style.buy} ${user.address ? style['bg-mobile'] : ''}`} id="buy">
            {!user.address ? <Fragment>
                    <img className={style['buy__icon_desktop']} src='../../assets/img/icons/wallet-buy-icon.png'
                         alt='wallet icon' />
                    <div className={style['buy__title']}>
                        <h2>Buy crl now</h2>
                        <img className={style['buy__icon_mobile']} src='../../assets/img/icons/wallet-buy-icon.png'
                             alt='wallet icon' />
                        <div
                            className={style['buy__title_button']}
                            onClick={() => setIsMenuWalletSelectionOpen(true)}
                        >
                            <h3>Connect wallet to buy CRL</h3>
                        </div>

                        {isMenuWalletSelectionOpen &&
                        <div className={style.walletSelectionContainer} ref={refMenuWalletSelection}>
                            <img src='../../assets/img/rectangle-wallet-nav.png' alt='wallet' />
                            <div className={style.walletSelectionContainerInner}>
                                <div
                                    onClick={handleMetamaskLogin}
                                    className={style.walletSelectionButton}
                                >
                                    <img src='../../assets/img/icons/metamask-icon.svg' alt='wallet' />
                                    <div>Metamask</div>
                                </div>
                                <hr />
                                <div
                                    onClick={handleWalletConnectLogin}
                                    className={style.walletSelectionButton}
                                >
                                    <img src='../../assets/img/icons/walletconnect-icon.svg' alt='wallet' />
                                    <div>Wallet Connect</div>
                                </div>
                            </div>
                        </div>
                        }

                        <svg style="visibility: hidden; position: absolute;" width="0" height="0"
                             xmlns="http://www.w3.org/2000/svg" version="1.1">
                            <defs>
                                <filter id="round">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                    <feColorMatrix in="blur" mode="matrix"
                                                   values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                    <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    <img className={style['buy__tree']} src='../../assets/img/tree-3.png' alt='tree' />
                </Fragment> :
                <Fragment>
                    <div className={style['buy__form']}>
                        <div className={style['buy__title']}>
                            <h2 className={style['pdt0']}>Buy crl now</h2>
                        </div>
                        <div className={style['buy__form_tabs']}>
                            <div
                                className={isActiveTabCrowdsale ? style['active-tab'] : ''}
                                onClick={(): void => tabHandler(0)}
                            >
                                <h2>WITH BNB, USDT AND BUSD</h2>
                                <img src='../../assets/img/tab-arrow.png' alt='arrow' />
                            </div>
                            <div
                                className={!isActiveTabCrowdsale ? style['active-tab'] : ''}
                                onClick={(): void => tabHandler(1)}
                            >
                                <h2>Buy crypto with fiat</h2>
                                <img src='../../assets/img/tab-arrow.png' alt='arrow' />
                            </div>
                        </div>
                        {!isActiveTabCrowdsale &&
                            <div className={style['infos-container']}>
                                <div className={style['buy__info_infos']}>
                                    <div className={style['buy__info_infos_title']}>
                                        <div className={style['buy__info_infos_title-number']}>
                                            <h2>1</h2>
                                        </div>
                                        <h3>BUY CRYPTO</h3>
                                    </div>
                                    <div className={style['buy__info_infos-text']}>
                                        <h3>You can buy bnb, usdt or busd with your card via Onramper.</h3>
                                    </div>
                                </div>
                                <div className={style['buy__info_infos']}>
                                    <div className={style['buy__info_infos_title']}>
                                        <div className={style['buy__info_infos_title-number']}>
                                            <h2>2</h2>
                                        </div>
                                        <h3>BUY CRL</h3>
                                    </div>
                                    <div className={style['buy__info_infos-text']}>
                                        <h3>With bnb, usdt or busd you can buy our CRL token. Make sure you connected  your Metamask wallet to the website.</h3>
                                    </div>
                                </div>
                            </div>

                        }
                        {isActiveTabCrowdsale ?
                                <CrowdsaleForm /> :
                                <OnRamper />
                        }
                    </div>
                    {(user.address && !!tokens && activeTab === 0) && <BuyInfo />}
                </Fragment>
            }

            {isModalOpen && <ModalConnected
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                title={'Wallet connected'}
                icon={'../../assets/img/img-modal-1.png'}
                bg={'../../assets/img/rectangle-modal-1.png'}
            />}
        </div>
    );
});

export default BuyNow;
