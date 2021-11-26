import OnramperWidget from "@onramper/widget";
import {FunctionalComponent, h} from 'preact';
import { orRamperApiKey } from "../../appConstants";
import style from './style.scss';

const WidgetContainer: FunctionalComponent = () => {
    // const wallets = {
    //     BUSD: { address: "0xe9e7cea3dedca5984780bafc599bd69add087d56" },
    //     USDT: { address: "0x55d398326f99059ff775485246999027b3197955" },
    // };

    return (
        <div
            className={style.onramper}
        >
            {/* @ts-ignore */}
            <OnramperWidget
                className={style['onramper__container']}
                API_KEY={orRamperApiKey}
                fontFamily={'Dosis'}
                // defaultAddrs={wallets}
                filters={{
                    onlyCryptos: ["BNB", "BUSD", "USDT"]
                }}
            />
        </div>
    );
}

export default WidgetContainer; 