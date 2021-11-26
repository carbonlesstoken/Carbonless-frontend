import { useCallback, useEffect, useState } from "preact/hooks";
import config from "../config";
import { Networks } from "../constants/networks";
import crowdsaleAbi from "../appConstants/contractAbi/crowdsaleAbi.json";
import {AbiItem} from "web3-utils";
import { createContract } from "../utils";
import {useMst} from "../store/store";
import { useWalletConnectorContext } from "../contexts/WalletConnect";

const {ADDRESSES, IS_MAINNET_OR_TESTNET} = config;

export const useFetchEndTime = () => {
    const {web3Provider} = useWalletConnectorContext();
    const { crlToken } = useMst();

    const getEndTime = useCallback(async () => {
        const preSaleContractAddress = ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRLPresale;
        try {
            const presaleContract = new web3Provider.web3Provider.eth.Contract(crowdsaleAbi, preSaleContractAddress);
            const time = await presaleContract.methods.endTime().call();
            crlToken.setTokenEndTime(time);
        } catch (e) {
            console.log(e, 'ERROR FEITCHING PRICE');
        }
    }, [])

    useEffect(() => {
        getEndTime();

        const fetchInterval = setInterval(() => {
            getEndTime();
        }, 10000);

        return () => clearInterval(fetchInterval);
    }, [])

    return { endTime: crlToken.endTime };

}