import {BigNumber as BN} from 'bignumber.js/bignumber';
import Web3 from 'web3';
import {AbiItem} from 'web3-utils';
import crowdsaleAbi from '../../appConstants/contractAbi/crowdsaleAbi.json';

import config from '../../config';
import ERC20Abi from "../../data/abi/ERC20Abi";
import {ContractHelper} from './ContractHelper';

const { ADDRESSES, IS_MAINNET_OR_TESTNET, ABIS }: any = config;

type TypeConstructorProps = {
  web3Provider: any;
  chainType: string;
};

type TypeClaimTokensProps = {
  contractAddress: string;
  userAddress: string;
};

type TypeVoteProps = {
  userAddress: string;
  contractAddress: string;
  stakingAmount: string;
  signature: string;
  yes: boolean;
  date: number | string;
  totalStakedAmount: string;
};

type TypeRegisterProps = {
  userAddress: string;
  contractAddress: string;
  tier: string;
  stakedAmount: string;
  signature: string;
  // totalStakedAmount: string;
  timestamp: string;
};

type TypeInvestProps = {
  userAddress: string;
  contractAddress: string;
  amount: string;
  signature: string;
  userBalance: string;
  timestamp: number;
  poolPercentages: number[];
  stakingTiers: number[];
};

type TypeInvestmentsProps = {
  userAddress: string;
  contractAddress: string;
  tokenDecimals: number;
};

export default class CRLPresaleAbiService extends ContractHelper {
  public web3: any;
  public contractAddress: string;
  public contractAbi: any;
  public contract: any;
  public contractName: string;
  public contractCRLAddress: string;
  public contractCRL: any;

  constructor(props: TypeConstructorProps) {
    super();
    const { web3Provider, chainType } = props;
    const addressesOfNetType = ADDRESSES[IS_MAINNET_OR_TESTNET];
    this.web3 = new Web3(web3Provider);

    this.contractName = 'CRLPresale';
    this.contractAddress = addressesOfNetType[chainType][this.contractName];
    this.contractAbi = ABIS[this.contractName];
  }

  // ========================================

  public vote = (props: TypeVoteProps) => {
    try {
      const {
        userAddress,
        contractAddress,
        yes,
        stakingAmount,
        signature,
        date,
        totalStakedAmount,
      } = props;
      // console.log('ContractPresalePublicService vote:', props);
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return contract.methods
        .vote(yes, stakingAmount, date, signature, totalStakedAmount)
        .send({ from: userAddress });
    } catch (e) {
      console.error('ContractPresalePublicService vote:', e);
      return null;
    }
  };

  public buyWithBnb = async (props: any) => {
    const contract = await this.createContract(ADDRESSES[IS_MAINNET_OR_TESTNET].CRLPresale, crowdsaleAbi as AbiItem[]);
    try {
      const { token_address,
        amount_to_pay,
        amount_to_receive,
        signature_expiration_timestamp,
        signature,
        userAddress,
      } = props;

      const gasBurn = await contract.methods
      .buy(
        token_address,
        amount_to_pay,
        amount_to_receive,
        signature_expiration_timestamp,
        signature,
      ).estimateGas({ from: userAddress, value: amount_to_pay });

      const response = await contract.methods
      .buy(
        token_address,
        amount_to_pay,
        amount_to_receive,
        signature_expiration_timestamp,
        signature,
      )
      .send({ from: userAddress, value: amount_to_pay, gas: gasBurn });
      return response;
    } catch (e) {
      console.error('ContractPresalePublicService invest:', e);
      return null;
    }
  };

  public collectFundsRaised = (props: TypeInvestProps) => {
    try {
      const { userAddress, contractAddress } = props;
      // console.log('ContractPresalePublicService collectFundsRaised props:', props);
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return contract.methods.collectFundsRaised().send({ from: userAddress });
    } catch (e) {
      console.error('ContractPresalePublicService collectFundsRaised:', e);
      return null;
    }
  };

  public price = async (): Promise<any> => {
    try {
      const contract = new this.web3.eth.Contract(this.contractAbi, this.contractAddress);
      const crlTokenPrice = await contract.methods.price().call();
      return crlTokenPrice;
    } catch (e) {
      console.log('CRLPresaleAbiService tokenSold:', e);
      return null;
    }
  };

  public endTime = async (props): Promise<any> => {
    try {
      const { contractAddress } = props;
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return await contract.methods.endTime().call();
    } catch (e) {
      console.error('CRLPresaleAbiService endTime: ', e);
      return null;
    }
  };

  public tokenSold = async (props): Promise<any> => {
    try {
      const { contractAddress } = props;
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      const result = await contract.methods.tokenSold().call();
      const decimals = await contract.methods.decimals().call();
      const pow = new BN(10).pow(new BN(decimals));
      const resultInEth = +new BN(result).div(pow);
      return resultInEth;
    } catch (e) {
      console.error('CRLPresaleAbiService tokenSold:', e);
      return null;
    }
  };

  public investments = async (props: TypeInvestmentsProps): Promise<any> => {
    try {
      const { userAddress, contractAddress, tokenDecimals } = props;
      // console.log('ContractPresalePublic investments props:', props);
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      const result = await contract.methods.investments(userAddress).call();
      const { amountEth, amountTokens } = result;
      const claimed = await contract.methods.claimed(userAddress).call();
      const pow = new BN(10).pow(new BN(18));
      const amountEthInEth = +new BN(amountEth).div(pow);
      const powToken = new BN(10).pow(new BN(tokenDecimals));
      const amountTokensInEth = +new BN(amountTokens).div(powToken);
      // const amountClaimedInEth = +new BN(claimed).div(powToken);
      return {
        amountEth: amountEthInEth,
        amountTokens: amountTokensInEth,
        amountClaimed: claimed ? 1 : 0,
      };
    } catch (e) {
      console.error('ContractPresalePublic investments:', e);
      return null;
    }
  };

  public register = (props: TypeRegisterProps) => {
    try {
      const {
        contractAddress,
        userAddress,
        stakedAmount,
        signature,
        // totalStakedAmount,
        timestamp,
        tier,
      } = props;
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return contract.methods
        .register(stakedAmount, tier, timestamp, signature)
        .send({ from: userAddress });
    } catch (e) {
      console.error('ContractPresalePublicService register:', e);
      return null;
    }
  };

  public claimTokens = (props: TypeClaimTokensProps) => {
    try {
      const { userAddress, contractAddress } = props;
      // console.log('ContractPresalePublicService claimTokens:', props);
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return contract.methods.claimTokens().send({ from: userAddress });
    } catch (e) {
      console.error('ContractPresalePublicService claimTokens:', e);
      return null;
    }
  };

  public cancelPresale = (props: TypeClaimTokensProps) => {
    try {
      const { userAddress, contractAddress } = props;
      // console.log('ContractPresalePublicService cancelPresale:', props);
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return contract.methods.cancelPresale().send({ from: userAddress });
    } catch (e) {
      console.error('ContractPresalePublicService cancelPresale:', e);
      return null;
    }
  };

  public collectFee = (props: TypeClaimTokensProps) => {
    try {
      const { userAddress, contractAddress } = props;
      // console.log('ContractPresalePublicService collectFee:', props);
      const contract = new this.web3.eth.Contract(this.contractAbi, contractAddress);
      return contract.methods.collectFee().send({ from: userAddress });
    } catch (e) {
      console.error('ContractPresalePublicService collectFee:', e);
      return null;
    }
  };

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
