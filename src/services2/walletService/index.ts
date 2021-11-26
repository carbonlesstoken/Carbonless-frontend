import { ConnectWallet } from '@amfi/connect-wallet';
import { IConnect, IError } from '@amfi/connect-wallet/dist/interface';
import BigNumber from 'bignumber.js/bignumber';
import { Observable } from 'rxjs';
import Web3 from 'web3';

import { connectWallet as connectWalletConfig, contracts, is_production, tokenNames } from '../../config2';

export class WalletService {
  public connectWallet: ConnectWallet;

  public walletAddress = '';

  constructor() {
    this.connectWallet = new ConnectWallet();
  }

  public async initWalletConnect(
    chainName: string,
    providerName: 'WalletConnect' | 'MetaMask',
  ): Promise<boolean> {
    return new Promise((resolve) => {
      const { provider, network, settings } = connectWalletConfig(chainName);

      // const connecting = this.connectWallet
      //   .connect(provider[providerName], network, settings)
      //   .then((connected: boolean | {}) => {
      //     return connected;
      //   })
      //   .catch((err: any) => {
      //     console.error('initWalletConnect providerWallet err: ', err);
      //   });

      // Promise.all([connecting]).then((connect: any) => {
      //   resolve(connect[0]);
      // });
    });
  }

  // public logOut(): void {
  //   this.connectWallet.resetConect();
  // }

  public Web3(): Web3 {
    console.log(this.connectWallet.currentWeb3());
    return this.connectWallet.currentWeb3();
  }

  public setAccountAddress(address: string) {
    this.walletAddress = address;
  }

  public getAccount(): Observable<IConnect | IError> {
    return this.connectWallet.getAccounts();
  }

  static getMethodInterface(abi: Array<any>, methodName: string) {
    return abi.filter((m) => {
      return m.name === methodName;
    })[0];
  }

  encodeFunctionCall(abi: any, data: Array<any>) {
    return this.Web3().eth.abi.encodeFunctionCall(abi, data);
  }

  createTransaction(
    method: string,
    data: Array<any>,
    contract: 'SALE',
    tx?: any,
    tokenAddress?: string,
    walletAddress?: string,
    value?: any,
  ) {
    const transactionMethod = WalletService.getMethodInterface(
      contracts.params[contract][is_production ? 'mainnet' : 'testnet'].abi,
      method,
    );

    let signature;
    if (transactionMethod) {
      signature = this.encodeFunctionCall(transactionMethod, data);
    }

    if (tx) {
      tx.from = walletAddress || this.walletAddress;
      tx.data = signature;

      return this.sendTransaction(tx);
    }
    return this.sendTransaction({
      from: walletAddress || this.walletAddress,
      to: tokenAddress || contracts.params[contract][is_production ? 'mainnet' : 'testnet'].address,
      data: signature || '',
      value: value || '',
    });
  }

  sendTransaction(transactionConfig: any) {
    return this.Web3().eth.sendTransaction({
      ...transactionConfig,
      from: this.walletAddress,
    });
  }

  async checkTokenAllowance(
    contractName: tokenNames,
    tokenDecimals: number,
    tokenAmount: number,
    approvedAddress?: string,
    walletAddress?: string,
  ) {
    const contract = this.connectWallet.Contract(contractName);
    const walletAdr = walletAddress || this.walletAddress;

    try {
      let result = await contract.methods
        .allowance(
          walletAdr,
          approvedAddress ||
            contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].address,
        )
        .call();

      result =
        result === '0'
          ? null
          : +new BigNumber(result).dividedBy(new BigNumber(10).pow(tokenDecimals)).toString(10);
      if (result && new BigNumber(result).minus(tokenAmount).isPositive()) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  async approveToken(
    contractName: tokenNames,
    tokenDecimals: number,
    approvedAddress?: string,
    walletAddress?: string,
  ) {
    try {
      const approveMethod = WalletService.getMethodInterface(
        contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].abi,
        'approve',
      );

      const approveSignature = this.encodeFunctionCall(approveMethod, [
        approvedAddress || walletAddress || this.walletAddress,
        WalletService.calcTransactionAmount(90071992000.5474099, tokenDecimals),
      ]);

      return this.sendTransaction({
        from: walletAddress || this.walletAddress,
        to: contracts.params[contractName][is_production ? 'mainnet' : 'testnet'].address,
        data: approveSignature,
      });
    } catch (error) {
      return error;
    }
  }

  static calcTransactionAmount(amount: number | string, tokenDecimal: number): string {
    return new BigNumber(amount).times(new BigNumber(10).pow(tokenDecimal)).toString(10);
  }

  static weiToEth(amount: number | string): string {
    return new BigNumber(amount).dividedBy(new BigNumber(10).pow(18)).toString(10);
  }
}
