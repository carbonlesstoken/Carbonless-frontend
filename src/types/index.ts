import { INetwork, IProvider, ISettings } from '@amfi/connect-wallet/dist/interface';

export * from './api';

export interface TeamI {
    img: string;
    alt: string;
    name: string;
    role: string;
    desc: string;
}

export interface SelectMenuI {
    name: string;
    img: string;
    alt: string;
}

export interface CurrencyI {
    img: string;
    alt: string;
    currency: string;
}

export interface TokensI {
    symbol: string;
    address: string;
    decimals: number;
    price: string;
}

export interface AddressI {
    contract: string;
    token: string;
}

export type TNullable<T> = T | null;

export interface OptionalClassNameProp {
  className?: string;
}
export interface IConnectWallet {
  network: INetwork;
  provider: {
    [index: string]: IProvider;
  };
  settings: ISettings;
}
export interface IChainConfig {
  name: string;
  id: number;
  rpc: string;
  tx: {
    link: string;
  };
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  blockExp: string;
}

export interface IContracts {
  decimals: number;
  names: string[];
  type: string;
  params: {
    [index: string]: {
      mainnet: {
        address: string;
        abi: any[];
      };
      testnet: {
        address: string;
        abi: any[];
      };
    };
  };
}

export type TOptionable<T> = T | undefined;

export enum Precisions {
  token = 10,
  shortToken = 4,
  fiat = 2, // 0.3244 USD = 0.32 USD, 100.1222 RUB = 100.12 RUB
}

export enum IWallets {
  metamask = 'metamask',
  trustwallet = 'trustwallet',
  walletconnect = 'walletconnect',
}
