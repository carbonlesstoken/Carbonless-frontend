import Web3 from 'web3';

import config from '../../config';

const { ABIS }: any = config;

type TypeConstructorProps = {
  web3Provider: any;
  chainType: string;
};

type TypeBalanceOfProps = {
  contractAddress: string;
  userAddress: string;
};

type TypeStakeProps = {
  contractAddress: string;
  userAddress: string;
  spender: string;
};

export default class ContractERC20 {
  public web3: any;

  public contractAbi: any;

  public contractName: string;

  constructor(props: TypeConstructorProps) {
    this.contractName = 'ERC20';

    const { web3Provider } = props;
    this.web3 = new Web3(web3Provider);

    this.contractAbi = ABIS[this.contractName];
  }

  public symbol = async ({ contractAddress }): Promise<number | null> => {
    try {
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return await contract.methods.symbol().call();
    } catch (e) {
      console.error('ContractERC20 symbol:', e);
      return null;
    }
  };

  public decimals = async ({ contractAddress }): Promise<number | null> => {
    try {
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return await contract.methods.decimals().call();
    } catch (e) {
      console.error('ContractERC20 decimals:', e);
      return null;
    }
  };

  public totalSupply = async ({ contractAddress }): Promise<any> => {
    try {
      // console.log('ContractPresalePublicService getInfo:', this.contractAbi, this.contractAddress)
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return await contract.methods.totalSupply().call();
    } catch (e) {
      console.error('ContractERC20 totalSupply:', e);
      return null;
    }
  };

  public balanceOf = async ({ contractAddress, userAddress }: TypeBalanceOfProps): Promise<any> => {
    try {
      // console.log('ContractPresalePublicService getInfo:', this.contractAbi, this.contractAddress)
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return await contract.methods.balanceOf(userAddress).call();
    } catch (e) {
      console.error('ContractERC20 balanceOf:', e);
      return null;
    }
  };

  public allowance = async ({
    contractAddress,
    userAddress,
    spender,
  }: TypeStakeProps): Promise<any> => {
    try {
      // console.log('ContractPresalePublicService getInfo:', this.contractAbi, this.contractAddress)
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return await contract.methods.allowance(userAddress, spender).call();
    } catch (e) {
      console.error('ContractERC20 allowance:', e);
      return null;
    }
  };

  public approve = async ({ contractAddress, userAddress, spender, amount }: any): Promise<any> => {
    try {
      // console.log('ContractPresalePublicService getInfo:', this.contractAbi, this.contractAddress)
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return await contract.methods.approve(spender, amount).send({ from: userAddress });
    } catch (e) {
      console.error('ContractERC20 approve:', e);
      return null;
    }
  };
}
