import ERC20Abi from "../data/abi/ERC20Abi";
import ERC20UsdtAbi from "../data/abi/ERC20UsdtAbi";
import CRLPresaleAbi from "../data/abi/CRLPresaleAbi";

const IS_PRODUCTION = true;
const SHOW_CONSOLE_LOGS = true;

export default {
  IS_PRODUCTION,
  SHOW_CONSOLE_LOGS,
  VERSION: IS_PRODUCTION ? 'Mainnet beta' : 'Testnet beta',
  IS_MAINNET_OR_TESTNET: IS_PRODUCTION ? 'mainnet' : 'testnet',
  LINKS: {
    twitter: 'https://twitter.com/bitgeario',
    telegram: 'https://t.me/bitgear',
    medium: 'https://medium.com/bitgear',
    github: 'https://github.com/',
    reddit: 'https://www.reddit.com/',
    discord: 'https://discord.gg/',
    email: 'support@mail.com',
    policy: '',
  },
  KEYS: {
    INFURA: '0cf982cd2e1c46a59ad53a60f7097765', // todo
    ETHERSCAN: '', // todo
  },
  CHAIN_IDS: {
    mainnet: {
      'Ethereum': {
        name: 'Mainnet',
        id: [1, '0x1', '0x01'],
      },
      'Binance-Smart-Chain': {
        name: 'Binance smart chain',
        id: [56, '0x38'],
      },
    },
    testnet: {
      'Ethereum':
        {
          name: 'Kovan testnet',
          id: [42, '0x2a'],
        },
        // : {
        //     name: 'Ropsten testnet',
        //     id: [3, '0x3'],
        //   },
      // 'Ethereum': {
      //   name: 'Rinkeby testnet',
      //   id: [4, '0x4'],
      // },
      'Binance-Smart-Chain': {
        name: 'Binance smart chain testnet',
        id: [97, '0x61'],
      },
    },
  },
  ADDRESSES: {
    mainnet: {
      'Binance-Smart-Chain': {
        CRLPresale: '0xb732519fffDA3A2C7321FfF703DDD4416fdC76B5',
        CRL: '0x4C1bF55CF4d5b5Ec33f7c0DF7276e96E161D8364',
        USDT: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
        BUSD: '0x55d398326f99059ff775485246999027b3197955',
        BNB: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      },
    },
    testnet: {
      'Binance-Smart-Chain': {
        CRLPresale: '0x2FD8B07A501728912240aAB3786aac80DFB75FcE',
        CRL: '0xB56E86c932F231f594a5aE4D88dC3A6490BAaED8',
        USDT: '0xd9B629A6FBDc6B0dB368106b2c90e99232C0CeE0',
        BUSD: '0x215775DcDAa4526a54D111A05406E3EcA5e17607',
        BNB: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
      },
    },
  },
  ABIS: {
    CRLPresale: CRLPresaleAbi,
    ERC20: ERC20Abi,
    ERC20Usdt: ERC20UsdtAbi,
  }
};
