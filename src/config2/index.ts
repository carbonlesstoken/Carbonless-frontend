import { IConnectWallet, IContracts } from '../types';

import { bep20Abi, saleAbi } from './abi';
import { is_production } from './constants';

export * from './constants';

export const chains: {
  [key: string]: {
    name: string;
    chainId: number;
    provider: {
      [key: string]: any;
    };
    img?: any;
  };
} = {
  'Trust': {
    name: 'Trust Wallet',
    chainId: is_production ? 1 : 0,
    provider: {
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'bridge',
        provider: {
          bridge: {
            bridge: 'https://bridge.walletconnect.org',
          },
        },
      },
    },
  },
  'Binance-Smart-Chain': {
    name: 'Binance-Smart-Chain',
    chainId: is_production ? 56 : 97,
    provider: {
      MetaMask: { name: 'MetaMask' },
      WalletConnect: {
        name: 'WalletConnect',
        useProvider: 'rpc',
        provider: {
          rpc: {
            rpc: {
              [is_production ? 56 : 97]: is_production
                ? 'https://bsc-dataseed.binance.org/'
                : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
            },
            chainId: is_production ? 56 : 97,
          },
        },
      },
    },
  },
};

export const connectWallet = (chainName: string): IConnectWallet => {
  const chain = chains[chainName];

  return {
    network: {
      name: chain.name.toString(),
      chainID: chain.chainId,
    },
    provider: chain.provider,
    settings: { providerType: true },
  };
};

export enum tokenNames {
  CRL = 'CRL',
  USDT = 'USDT',
  BUSD = 'BUSD',
  BNB = 'BNB',
}

export enum ContractsNames {
  SALE = 'CRLPresale',
  CRL = 'CRL',
  USDT = 'USDT',
  BUSD = 'BUSD',
  BNB = 'BNB',
}

export type IContractsNames = keyof typeof ContractsNames;

export const contracts: IContracts = {
  type: is_production ? 'mainnet' : 'testnet',
  names: Object.keys(ContractsNames),
  decimals: 18,
  params: {
    SALE: {
      mainnet: {
        address: '',
        abi: saleAbi,
      },
      testnet: {
        address: '0x2FD8B07A501728912240aAB3786aac80DFB75FcE',
        abi: saleAbi,
      },
    },
    CRL: {
      mainnet: {
        address: '',
        abi: bep20Abi,
      },
      testnet: {
        address: '0xB56E86c932F231f594a5aE4D88dC3A6490BAaED8',
        abi: bep20Abi,
      },
    },
    USDT: {
      mainnet: {
        address: '',
        abi: bep20Abi,
      },
      testnet: {
        address: '0xd9B629A6FBDc6B0dB368106b2c90e99232C0CeE0',
        abi: bep20Abi,
      },
    },
    BUSD: {
      mainnet: {
        address: '',
        abi: bep20Abi,
      },
      testnet: {
        address: '0x215775DcDAa4526a54D111A05406E3EcA5e17607',
        abi: bep20Abi,
      },
    },
    BNB: {
      mainnet: {
        address: '',
        abi: null,
      },
      testnet: {
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        abi: null,
      },
    },
  },
};
