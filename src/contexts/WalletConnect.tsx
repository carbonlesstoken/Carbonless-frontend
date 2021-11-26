import { FunctionalComponent, createContext, h } from "preact";
import { useState, useCallback, useEffect, useContext } from "preact/hooks";
import { observer } from "mobx-react-lite";

import MetamaskProvider from '../services/Metamask';
import Web3Provider from '../services/Web3Provider';
import { getFromStorage, setToStorage } from '../utils/localStorage';
import { useMst } from "../store/store";

const walletConnectorContext = createContext<any>({
  web3Provider: {},
});

const Connector: FunctionalComponent = ({ children }) => {
  const { user, wallet, modal } = useMst();
  const { type: walletType } = wallet;

  const [web3Provider, setWeb3Provider] = useState<any>(null);

  const walletTypeInLocalStorage = getFromStorage('walletType');

  const login = useCallback(
    async (web3: any) => {
      try {
        if (!modal) return;
        if (!web3) return;
        const addresses = await web3.connect();
        const balance = await web3.getBalance(addresses[0]);
        const resultCheckNetwork = await web3.checkNetwork();
        if (resultCheckNetwork.status === 'ERROR') {
          modal.open({
            text: resultCheckNetwork.message
          })
        } else {
          console.log('Web3Connector login chainId:', resultCheckNetwork.data);
          wallet.setChainId(resultCheckNetwork.data.toString());
        }
        console.log('Web3Connector login balance:', balance);
        user.login({
          address: addresses[0],
          balance: balance.toString(),
        })
      } catch (e) {
        console.error('Web3Connector login:', e);
        // setToStorage('walletType', '');
        // window.location.reload();
      }
    },
    [user, wallet, modal],
  );

  const init: any = useCallback(() => {
    try {
      let web3;
      if (walletTypeInLocalStorage === 'walletConnect') {
        web3 = new Web3Provider();
      } else if (walletTypeInLocalStorage === 'metamask') {
        web3 = new MetamaskProvider();
      }
      if (!web3) return;

      if (walletTypeInLocalStorage !== 'walletConnect') {
        web3.provider.on('accountsChanged', (accounts: string[]) => {
          console.log('Web3Provider accountsChanged:', accounts);
          init();
        });

        web3.provider.on('chainChanged', (chainId: number) => {
          console.log('Web3Provider chainChanged:', chainId);
          init();
        });

        web3.provider.on('disconnect', (code: number, reason: string) => {
          console.log('Web3Provider disconnect:', code, reason);
        });
      }

      login(web3);
      setWeb3Provider(web3);
    } catch (e) {
      console.error('init:', e);
    }
  }, [walletType]);

  useEffect(() => {
    init();
  }, [walletType]);

  return (
    <walletConnectorContext.Provider value={{ web3Provider }}>
      {children}
    </walletConnectorContext.Provider>
  );
};

export default observer(Connector);

export function useWalletConnectorContext() {
  return useContext(walletConnectorContext);
}
