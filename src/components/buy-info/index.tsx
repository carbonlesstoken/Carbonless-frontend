import style from "../buy-now/style.scss";
import {Fragment, FunctionalComponent, h} from "preact";
import {useFetchTokens, useFetchTokenSold, useFetchTotalSupply} from "../../hook";
import {useMst} from "../../store/store";
import {getSpacedNumber, getTokenAmountDisplay} from "../../utils";
import {useCallback, useEffect, useState} from "preact/hooks";
import ContractCRLPresaleService from "../../services/contracts/ContractCRLPresale";
import {Networks} from "../../constants/networks";
import {useWalletConnectorContext} from "../../contexts/WalletConnect";
import config from "../../config";
import { crlTotalSupply, miliSecondsInDay } from "../../appConstants";
import {useFetchCRLPrice} from "../../hook/useFetchCrlPrice";
import {useFetchEndTime} from "../../hook/useFetchEndTime";

const {ADDRESSES, IS_MAINNET_OR_TESTNET} = config;
const addresses = ADDRESSES[IS_MAINNET_OR_TESTNET];

const BuyInfo: FunctionalComponent = () => {
    const tokens = useFetchTokens();
    const {crlToken, wallet, user} = useMst();
    const {web3Provider} = useWalletConnectorContext();
    const [days, setDays] = useState(0);
    const { crlPrice, price } = useFetchCRLPrice();
    const { endTime } = useFetchEndTime();
    const { sold } = useFetchTokenSold(user.address);
    const currentTime = Math.ceil(new Date().getTime() / 1000);

    const daysHandler = useCallback(() => {
        const endDate = +crlToken.endTime *1000;
        const startDate = new Date().getTime();
        const result = Math.ceil((endDate - startDate) / (miliSecondsInDay));
        setDays(result)
    }, [crlToken.endTime])

    useEffect(() => {
        daysHandler()
    }, [tokens])

    return (
        <div className={style['buy__info']}>
            <div className={style['buy__info_progress']}>

                {crlToken.endTime !== '0' && +crlToken.endTime >= currentTime &&
                    <Fragment>
                        <h2 className={style['buy__info_title']}>{(crlToken.endTime !== '0' && days > 0) ? days : 1}</h2>
                        <h3 className={style['buy__info_subtitle']}>{days === 1 ? 'DAY' : 'DAYS'} LEFT</h3>
                    </Fragment>
                }

                {crlToken.endTime === '0' &&
                <Fragment>
                    <h3 className={style['buy__info_subtitle']}>Begin soon</h3>
                </Fragment>
                }

                {(+crlToken.endTime <= currentTime && crlToken.endTime !== '0') &&
                <Fragment>
                    <h3 className={style['buy__info_subtitle']}>Closed</h3>
                </Fragment>
                }
                <div className={style['buy__info_progress_bar']}>
                    <div/>
                    <div className={style['buy__info_progress_bar_scale']} style={{ width: crlTotalSupply ? `${(100 / crlTotalSupply) * sold}%` : '0%', }} />
                    <div/>
                    <div/>
                    <div/>
                    <div/>
                </div>
                <h3 className={style['buy__info_subtitle']}>{getSpacedNumber(sold.toString())} of {getSpacedNumber(crlTotalSupply.toString())} sold</h3>
            </div>

            <div className={style['buy__info_crl']}>
                <h2 className={style['buy__info_title']}>{wallet.chainId ? price : '0.0005'}$</h2>
                <h3 className={style['buy__info_subtitle']}>CURRENT CRL PRICE</h3>
            </div>

            <div className={style['buy__info_rates']}>
                <h2>CURRENT RATES:</h2>
                <div className={style['buy__info_rates_container']}>
                    {tokens.map((token) => {
                            const {address, symbol, price} = token;
                            return <div key={`${address}__`}>
                                <img src={`../../assets/img/icons/${symbol}-icon.png`} alt={`${symbol}`}/>
                                <h3>${price}</h3>
                            </div>
                        }
                    )}
                </div>
                <img className={style['buy__info_rates_img']} src='../../assets/img/rates-leaf.png'
                     alt='leaf img'/>
            </div>
        </div>
    )
}

export default BuyInfo;
