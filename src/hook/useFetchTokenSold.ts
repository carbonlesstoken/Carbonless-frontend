import { useCallback, useEffect, useState } from "preact/hooks";
import config from "../config";
import { Networks } from "../constants/networks";
import erc20Abi from "../appConstants/contractAbi/erc20Abi.json";
import crowdsaleAbi from "../appConstants/contractAbi/crowdsaleAbi.json";
import {AbiItem} from "web3-utils";
import { createContract, getTokenAmountDisplay } from "../utils";
import {useMst} from "../store/store";
import { useWalletConnectorContext } from "../contexts/WalletConnect";

const {ADDRESSES, IS_MAINNET_OR_TESTNET} = config;

export const useFetchTokenSold = ( userAddress = '') => {
  const [sold, setSold] = useState(0);
  const [lockedTokens, setLockedTokens] = useState(0);
  const {crlToken, user} = useMst();
  const {web3Provider} = useWalletConnectorContext();

  const getTokenSold = useCallback(async () => {
    const presaleAddress = ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRLPresale;
    const tokenAddress = ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRL;
    try {
      const preSaleContract = await createContract(presaleAddress, crowdsaleAbi as any);

        const tokenContract = await createContract(tokenAddress, erc20Abi as any);
        const decimals = await tokenContract.methods.decimals().call();
        const soldCrlAmount = await preSaleContract.methods.tokenSold().call();

        const soldCrlAmountNoDecimals = Math.floor(+getTokenAmountDisplay(soldCrlAmount, decimals));

        setSold(soldCrlAmountNoDecimals);
        crlToken.setTokenSold(soldCrlAmountNoDecimals.toString());

        if (userAddress !== '' && user.balance) {
          const lockedTokensfetch = await preSaleContract.methods.amounts(userAddress, 0).call();
          setLockedTokens(+lockedTokensfetch);
        }
        
    } catch (e) {
        console.error(e);
        setLockedTokens(0);
    }
  }, [userAddress])

    useEffect(() => {
        getTokenSold();

        const fetchInterval = setInterval(() => {
            getTokenSold();
        }, 10000);

        return () => clearInterval(fetchInterval);
    }, [userAddress])


  return { sold, lockedTokens, setLockedTokens };

}