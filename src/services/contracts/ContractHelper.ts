import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

export class ContractHelper {
  public getWeb3 = async () => {
    const web3 = new Web3(Web3.givenProvider);
    return web3;
  }

  public createContract = async (address: string, abi: AbiItem[]) => {
    const web3 = await this.getWeb3();
    const contract = new web3.eth.Contract(abi, address);
    return contract;
  }
}