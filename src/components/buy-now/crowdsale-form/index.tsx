import {FunctionalComponent, h} from 'preact';
import style from '../style.scss';
import {observer} from "mobx-react-lite";
import {useCallback, useEffect, useRef, useState} from "preact/hooks";
import crowdsaleAbi from '../../../appConstants/contractAbi/crowdsaleAbi.json';
import erc20Abi from '../../../appConstants/contractAbi/erc20Abi.json';

import {AbiItem} from 'web3-utils';

import {useMst} from "../../../store/store";
import {selectMenu} from "./mock";
import {useOnClickOutside} from "../../../hook/useOnClickOutside";
import {useWalletConnectorContext} from "../../../contexts/WalletConnect";
import ContractERC20Service from "../../../services/contracts/ContractERC20";
import ContractCRLPresaleService from "../../../services/contracts/ContractCRLPresale";
import config from '../../../config';
import {Networks} from "../../../constants/networks";
import {TNullable} from '../../../types';
import {baseApi} from '../../../api/api';
import {createContract, getTokenAmount, getTokenAmountDisplay} from '../../../utils';
import {useFetchTokens, useFetchTotalSupply} from "../../../hook";
import NotificationModal from "../../../containers/NotificationModals";

const srcCRLIcon = '../../../assets/img/icons/crl-icon.png';
const srcOkButton = '../../../assets/img/ok-button.png';
const srcArrowDown = '../../../assets/img/selector-arrow-down.svg';

const {ADDRESSES, IS_MAINNET_OR_TESTNET} = config;
const addresses = ADDRESSES[IS_MAINNET_OR_TESTNET];
const CrowdsaleForm: FunctionalComponent = observer(() => {
    const {user, crlToken, notificationModal} = useMst();
    const {address: userAddress, balances} = user;
    const {isOpen, type, result, open, close, func} = notificationModal;

    const tokens = useFetchTokens();
    const { myCrlBalance } = useFetchTotalSupply(userAddress);

    const {web3Provider} = useWalletConnectorContext();

    const [ContractERC20, setContractERC20] = useState<any>();
    const [ContractCRLPresale, setContractCRLPresale] = useState<any>();

    const [crlInputAmount, setCrlInputAmount] = useState('');

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [selectedCurrency, setSelectedCurrency] = useState<string>('USDT');
    const [currencyPrice, setCurrencyPrice] = useState(1)
    const [amount, setAmount] = useState('');
    const [transactionHash, setTransactionHash] = useState('');

    const refMenu = useRef<TNullable<HTMLDivElement>>(null);
    const refHead = useRef<HTMLHeadingElement | any>(null);

    const symbols = ['-', '+', '_', '[', ']', '(', ')', '{', '}', '#', '!', '@', '$', '%', '^', '&', '*', '=', '/', '|', '~', '<', '>', '€', '£', '?', '`'];

    const menuHandler = useCallback((): void => {
        setIsMenuOpen(!isMenuOpen)
    }, [isMenuOpen])

    const connectContracts = useCallback(async () => {
        try {
            // console.log('CrowdsaleForm connectContract');
            const newContractERC20 = new ContractERC20Service({
                web3Provider: web3Provider.provider,
                chainType: Networks.Binance,
            });
            setContractERC20(newContractERC20);

            const newContractCRLPresale = new ContractCRLPresaleService({
                web3Provider: web3Provider.provider,
                chainType: Networks.Binance,
            });
            setContractCRLPresale(newContractCRLPresale);


        } catch (e) {
            // console.log("contract creation error");
        }
    }, [web3Provider])

    const getCRLBalance = useCallback(async () => {
        user.setBalances({CRL: myCrlBalance});
    }, [myCrlBalance])

    const selectedCurrencyHandler = useCallback((name: string) => {
        setSelectedCurrency(name)
        setIsMenuOpen(!isMenuOpen)
    }, [isMenuOpen])

    const inputHandler = useCallback((value): void => {
        setAmount(value);
    }, [amount, crlInputAmount, crlToken.price, tokens]);

    useEffect(() => {
        if (amount === '0' || !amount) {
            setCrlInputAmount('')
        } else {
            const result = getTokenAmountDisplay(String((Number(amount) * currencyPrice) / Number(crlToken.price)), -9);
            setCrlInputAmount(result);
        }
    }, [amount, crlToken.price, tokens])

    useOnClickOutside([refMenu, refHead], menuHandler);

    const handleBuy = async () => {
        notificationModal.setFunc('handleBuy')
        try {
            open()
            notificationModal.setType('send')
            notificationModal.setResult('pending')
            if (amount !== '0' && amount) {
                const {data} = await baseApi.signature({
                    token_address: addresses[Networks.Binance][selectedCurrency.toUpperCase()],
                    amount_to_pay: getTokenAmount(amount),
                })

                const {amount_to_pay, amount_to_receive, signature, signature_expiration_timestamp, token_address} = data;
                const contract = new web3Provider.web3Provider.eth.Contract(crowdsaleAbi, ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRLPresale);

                const gasBurn = await contract.methods
                    .buy(
                        token_address,
                        amount_to_pay,
                        amount_to_receive,
                        signature_expiration_timestamp,
                        signature,
                    ).estimateGas({from: userAddress, value: amount_to_pay});


                const response = await contract.methods
                    .buy(
                        token_address,
                        amount_to_pay,
                        amount_to_receive,
                        signature_expiration_timestamp,
                        signature,
                    ).send({from: userAddress, value: amount_to_pay}).then(r => {
                        notificationModal.setResult('success')
                        setTransactionHash(r.transactionHash)
                    });
            }


        } catch (e) {
            console.error('ContractPresalePublicService invest:', e);
            notificationModal.setResult('reject')
            return null;
        }
    }

    const handleTokenBuy = async () => {
        notificationModal.setFunc('handleTokenBuy')
        if (amount !== '0' && amount) {
            open()
            notificationModal.setType('approve')
            notificationModal.setResult('pending')
            const presaleAddress = ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRLPresale;
            try {
                const {data} = await baseApi.signature({
                    token_address: addresses[Networks.Binance][selectedCurrency.toUpperCase()],
                    amount_to_pay: getTokenAmount(amount),
                })
                const {amount_to_pay, amount_to_receive, signature, signature_expiration_timestamp, token_address} = data;
                const preSaleContract = new web3Provider.web3Provider.eth.Contract(crowdsaleAbi, ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRLPresale);
                const tokenContract = new web3Provider.web3Provider.eth.Contract(erc20Abi, ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance][selectedCurrency].toUpperCase());
                const allowance = await tokenContract.methods.allowance(userAddress, presaleAddress).call();
                console.log(allowance, amount_to_pay, 'AMOUNTS');

                if (+allowance < +amount_to_pay) {
                    // @ts-ignore
                    await tokenContract.methods.approve(preSaleContract._address, amount_to_pay)
                    .send({from: userAddress});
                }
               

                notificationModal.setType('send')
                notificationModal.setResult('pending');
                const receipt = await preSaleContract.methods
                    .buy(
                        token_address,
                        amount_to_pay,
                        amount_to_receive,
                        signature_expiration_timestamp,
                        signature,
                    ).send({from: userAddress, value: 0});
                notificationModal.setResult('success')
                setTransactionHash(receipt.transactionHash)

            } catch (e) {
                console.error('ContractPresalePublicService invest:', e);
                notificationModal.setResult('reject')
                return null;
            }
        }
    }

    useEffect(() => {
        if (!web3Provider) return;
        connectContracts();
    }, [web3Provider, connectContracts])

    useEffect(() => {
        if (!ContractERC20) return;
        if (!userAddress) return;
        // getTokenPrice()
        getCRLBalance();
    }, [userAddress, ContractERC20, tokens])

    useEffect(() => {
        setAmount('');
        setCrlInputAmount('');
        tokens.filter(token => token.symbol === selectedCurrency && setCurrencyPrice(Number(token.price)))
    }, [selectedCurrency])

    return (
        <div className={style['buy__form_content']}>
            <div className={style['buy__form_content_balance']}>
                <h2>Your CRL balance</h2>
                <h3>{balances.CRL} CRL</h3>
            </div>
            <div className={style['buy__form_content_input-1']}>
                <input
                    onInput={(e: any): void => inputHandler(e.target.value)}
                    value={amount}
                    type='number'
                    placeholder="0"
                    onKeyPress={(e: any): void => {
                        for (let i = 0; i < symbols.length; i++) {
                            if (e.key === symbols[i]) {
                                e.preventDefault();
                            }
                        }

                        if (amount.length > 19) {
                            e.preventDefault();
                        }
                    }}
                />
                <div className={style['buy__form_content_input-1_title']}>
                    <h2>SPEND</h2>
                </div>

                <div className={style['buy__form_content_input-1_selector']}>
                    <div ref={refHead} onClick={menuHandler}
                         className={style['buy__form_content_input-1_selector_head']}>
                        <img className={style['buy__form_content_input-1_selector_icon']}
                             src={`../../assets/img/icons/${selectedCurrency}-icon.png`} alt='usdt'/>
                        <h2>{selectedCurrency}</h2>
                        <img
                            className={`${style['buy__form_content_input-1_selector_arrow']} ${isMenuOpen ? style['rotated180'] : ''}`}
                            src={srcArrowDown} alt='arrow'/>
                    </div>

                    {isMenuOpen &&
                    <div ref={refMenu} className={style['buy__form_content_input-1_selector_menu']}>
                        {selectMenu.map((item, index: number) =>
                            <div value={item.name}
                                 onClick={() => selectedCurrencyHandler(refMenu.current.children[index].textContent)}
                                 key={`${item.alt}_${index}`}>
                                <img className={style['buy__form_content_input-1_selector_icon']}
                                     src={item.img} alt={item.alt}/>
                                <h2>{item.name}</h2>
                            </div>
                        )}
                    </div>}
                </div>
            </div>
            <div className={style['buy__form_content_input-2']}>
                <input value={crlInputAmount} disabled maxLength={10}/>
                <div className={style['buy__form_content_input-2_title']}>
                    <h2>You will receive CRL</h2>
                </div>
                <div className={style['buy__form_content_input-2_badge']}>
                    <img src={srcCRLIcon} alt='crl icon'/>
                    <h2>CRL</h2>
                </div>
            </div>

            <div className={style['buy__form_content_desc-1']}>
                <h2>Buy Over 10 Million Crl At Once And Get Extra 4%</h2>
            </div>

            <div className={style['buy__form_content_desc-2']}>
                <h2>You buy CRL Tokens by sending {selectedCurrency} to the contract</h2>
            </div>

            <div onClick={selectedCurrency === "BNB" ? handleBuy : handleTokenBuy}
                 className={style['buy__form_content_button']}>
                <h3>Buy</h3>
                <img src={srcOkButton} alt={'button'}/>
            </div>

            {(type && result) && (func === 'handleBuy' || func === 'handleTokenBuy') ? <NotificationModal handleBuy={handleBuy}
                                                   handleTokenBuy={handleTokenBuy} isOpen={isOpen} result={result}
                                                   type={type} close={close} transactionHash={transactionHash}
                                                   func={func}
            /> : ''}
        </div>
    );
});

export default CrowdsaleForm;