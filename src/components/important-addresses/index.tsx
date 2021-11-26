import {FunctionalComponent, h} from 'preact';
import style from './style.scss';
import {useCallback, useEffect, useState} from "preact/hooks";
import {AddressI} from "../../types";
import {baseApi} from "../../api/api";
import {notify} from "../../utils/notify";

const Addresses: FunctionalComponent = () => {
    const [address, setAddress] = useState<AddressI>({
        contract: '',
        token: ''
    });

    const addressHandler = useCallback((data): void => {
        setAddress({
            contract: data["contract address"],
            token: data["token address"],
        })
    }, [])

    useEffect(() => {
        baseApi.getAddress().then((r => addressHandler(r.data)))
    }, [])

    const copyClipboard = (value): void => {
        navigator.clipboard.writeText(value)
        notify('Address was copied!')
    };

    return (
        <div className={style.addresses}>
            <div className={style['addresses__container']}>
                <h2 className={style['addresses__container_title']}>IMPORTANT ADDRESSES</h2>
                <div className={style['addresses__container_content']}>
                    <div className={style['addresses__container_content_item']}>
                        <div>
                            <h2 className={style['addresses__container_content_item-mobile']}>{address.token.substr(0,7)}...{address.token.substr(-7)}</h2>
                            <h2 className={style['addresses__container_content_item-desktop']}>{address.token}</h2>
                            <h3>TOKEN CONTRACT</h3>
                        </div>
                        <img onClick={() => copyClipboard(address.token)} className={style['addresses__container_content_item_icon']} src='../../assets/img/icons/copy-icon.png' alt='copy icon' />
                        <img className={style['addresses__container_content_item_bg']} src='../../assets/img/rectangle-7.png' alt='bg item' />
                    </div>

                    <div className={style['addresses__container_content_item']}>
                        <div>
                            <h2 className={style['addresses__container_content_item-mobile']}>{address.contract.substr(0,7)}...{address.contract.substr(-7)}</h2>
                            <h2 className={style['addresses__container_content_item-desktop']}>{address.contract}</h2>
                            <h3>CROWDSALE CONTRACT</h3>
                        </div>
                        <img onClick={() => copyClipboard(address.contract)} className={style['addresses__container_content_item_icon']} src='../../assets/img/icons/copy-icon.png' alt='copy icon' />
                        <img className={style['addresses__container_content_item_bg']} src='../../assets/img/rectangle-8.png' alt='bg item' />
                    </div>
                </div>
            </div>
            <img className={style['addresses__container_bg']} src='../../assets/img/rectangle-card-6.png' alt='rectangle 6 cart' />
        </div>
    );
};

export default Addresses;