import { useCallback, useEffect, useState } from "preact/hooks";
import config from "../config";
import { Networks } from "../constants/networks";
import crowdsaleAbi from "../appConstants/contractAbi/crowdsaleAbi.json";
import {createContract, getTokenAmountDisplay} from "../utils";
import {useMst} from "../store/store";
import { useWalletConnectorContext } from "../contexts/WalletConnect";

const {ADDRESSES, IS_MAINNET_OR_TESTNET} = config;

export const useFetchCRLPrice = () => {
  const {crlToken} = useMst();
  const {web3Provider} = useWalletConnectorContext();

  const [price, setPrice] = useState('0.00005');

  const getCRLPrice = useCallback(async () => {
    const preSaleContractAddress = ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRLPresale;
    try {
      const presaleContract = await createContract(preSaleContractAddress, crowdsaleAbi as any);
        const crlPrice = await presaleContract.methods.price().call();
        crlToken.setTokenPrice(crlPrice)
        setPrice(getTokenAmountDisplay(crlPrice, 9))
    } catch (e) {
        console.log(e, 'ERROR FETCHING PRICE');
    }
  }, [])

    useEffect(() => {
        getCRLPrice();

        const fetchInterval = setInterval(() => {
            getCRLPrice();
        }, 10000);

        return () => clearInterval(fetchInterval);
    }, [])


  return { crlPrice: crlToken.price, price };

}