import config from "../config";
import { Networks } from "../constants/networks";
import { createContract, getTokenAmountDisplay } from "../utils";
import {AbiItem} from "web3-utils";
import erc20Abi from "../appConstants/contractAbi/erc20Abi.json";
import { useEffect, useState } from "preact/hooks";
import {useMst} from "../store/store";

const {ADDRESSES, IS_MAINNET_OR_TESTNET} = config;
const addresses = ADDRESSES[IS_MAINNET_OR_TESTNET];

export const useFetchTotalSupply = (userAddress = '') => {
  const [totalSupply, setTotalSupply] = useState('0');
  const { user } = useMst();
    // const [myCrlBalance, setMyCrlBalance] = useState('0')

  const getTotalSupply = async () => {

      try {
          const tokenContract = await createContract(ADDRESSES[IS_MAINNET_OR_TESTNET][Networks.Binance].CRL, erc20Abi as AbiItem[]);
          const totalSupply = await tokenContract.methods.totalSupply().call();
          const decimals = await tokenContract.methods.decimals().call();

          const balance = await tokenContract.methods.balanceOf(userAddress).call();
          // setMyCrlBalance(getTokenAmountDisplay(balance, decimals));
          user.setBalances({CRL: getTokenAmountDisplay(balance, decimals)});
          console.log('myCrlBalance :', user.balances.CRL)

          setTotalSupply(getTokenAmountDisplay(totalSupply, decimals));
      } catch (e) {
          console.log(e);
      }
  }

    useEffect(() => {
        getTotalSupply();

    }, [userAddress])


  return { totalSupply,  myCrlBalance: user.balances.CRL };
}