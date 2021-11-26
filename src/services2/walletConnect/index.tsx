import React, { createContext, useContext } from 'react';
import { h } from 'preact';
import { contracts, is_production } from '../../config2';

import { WalletService } from '..';

declare global {
  interface Window {
    ethereum: any;
    kardiachain: any;
  }
}

const walletConnectorContext = createContext<{
  connect: (providerName: string) => Promise<void>;
  disconnect: () => void;
  walletService: WalletService;
  address: string;
  isContractsExists: boolean;
}>({
  connect: null,
  disconnect: (): void => {},
  walletService: new WalletService(),
  address: '',
  isContractsExists: false,
});

class Connector extends React.Component<
  any,
  {
    provider: WalletService;
    address: string;
    isContractsExists: boolean;
  }
> {
  constructor(props: any) {
    super(props);

    this.state = {
      provider: new WalletService(),
      address: '',
      isContractsExists: false,
    };

    this.connect = this.connect.bind(this);
    this.disconnect = this.disconnect.bind(this);
  }

  componentDidMount() {
    this.state.provider.connectWallet.initWeb3(
      is_production
        ? 'https://bsc-dataseed.binance.org/'
        : 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    );
    const promises: Array<Promise<any>> = contracts.names.map((contract) => {
      const { address, abi } = contracts.params[contract][is_production ? 'mainnet' : 'testnet'];

      return this.state.provider.connectWallet.addContract({
        name: contract,
        address,
        abi,
      });
    });

    Promise.all(promises)
      .then(() => {
        this.setState({
          isContractsExists: true,
        });
      })
      .catch(() => {
        this.disconnect();
      });

    // if (localStorage.walletconnect) {
    //   this.connect('WalletConnect');
    // }
  }

  connect = async (providerName) => {
    try {
      const isConnected = await this.state.provider.initWalletConnect(
        'Binance-Smart-Chain',
        providerName,
      );
      if (isConnected) {
        this.state.provider.getAccount().subscribe(
          (userAccount: any) => {
            if (this.state.address && userAccount.address !== this.state.address) {
              this.disconnect();
            } else {
              this.setState({
                address: userAccount.address,
              });

              this.state.provider.setAccountAddress(userAccount.address);
            }
          },
          () => {
            alert(
              `Wrong Network, please select ${
                is_production ? 'mainnet' : 'testnet'
              } network in your wallet and try again`,
            );
            this.disconnect();
          },
        );
      }
    } catch (err) {
      console.error(err);
      // this.disconnect();
    }
  };

  disconnect() {
    delete localStorage.walletconnect;
    this.setState({
      address: '',
    });
  }

  render() {
    return (
      // @ts-ignore
      <walletConnectorContext.Provider
        value={{
          walletService: this.state.provider,
          connect: this.connect,
          disconnect: this.disconnect,
          address: this.state.address,
          isContractsExists: this.state.isContractsExists,
        }}
      >
        {this.props.children}
      </walletConnectorContext.Provider>
    );
  }
}

export default Connector;

export function useWalletConnectorContext2() {
  return useContext(walletConnectorContext);
}
