import { AbiItem } from 'web3-utils';
import { getWeb3 } from '.';
import MetamaskService from '../services/Metamask';
import Web3Provider from '../services/Web3Provider';

export const createContract = async (address: string, abi: AbiItem[]) => {
  const web3 = await getWeb3();
  const contract = new web3.eth.Contract(abi, address);
  return contract;
};
