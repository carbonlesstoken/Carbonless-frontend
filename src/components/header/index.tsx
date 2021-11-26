import { Fragment, FunctionalComponent, h } from 'preact';
import {useCallback, useEffect, useMemo, useRef, useState} from "preact/hooks";
import { Link } from 'preact-router/match';
import { observer } from "mobx-react-lite";

import {ModalConnected, ModalDisconnect} from "../index";
import {useMst} from "../../store/store";
import { useWalletConnectorContext } from "../../contexts/WalletConnect";
import { links } from "../footer/mock";
import { setToStorage, getFromStorage } from "../../utils/localStorage";
import {notify} from "../../utils/notify";
// import { useWalletConnectorContext2 } from '../../services2';

import { IWallets } from '../../types';
import ConnectWalletMenuHeader from './connect-wallet-menu-header';
import { shortenAddress } from './helpers';
import SomeSvg from './some-svg';
import ListItemsWithSeparator from '../list-items-with-separator';
import { NavLinks } from '../';

import style from './style.scss';

const WalletAccountContainerHeader: FunctionalComponent = () => {
  const walletType = useMemo(() => getFromStorage('walletType') as string, []);
  const isConnectedWithMetamask = walletType === IWallets.metamask;
  const connectedWithWalletText = `Connected with ${
    isConnectedWithMetamask
    ? IWallets.metamask
    : IWallets.walletconnect}`;

  return (
    <div className={style['header__wallet_account_container_header']}>
        <h2>Account</h2>
        <h3>{connectedWithWalletText}</h3>
    </div>
  );
};

const CopyButton: FunctionalComponent = observer(() => {
  const { user } = useMst();
  const { address: userAddress } = user;
  const copyClipboard = (): void => {
      navigator.clipboard.writeText(userAddress);
      notify('Address was copied!')
  };
  return (
    <img onClick={copyClipboard} src='../../assets/img/icons/copy-icon-32.png' alt='copy' />
  );
});

const walletsMap: Partial<Record<keyof typeof IWallets, { title: string; iconSrc: string }>>= {
  metamask: {
    title: 'Metamask',
    iconSrc: '../../assets/img/icons/metamask-icon.svg',
  },
  walletconnect: {
    title: 'Wallet Connect',
    iconSrc: '../../assets/img/icons/walletconnect-icon.svg',
  },
};

type MenuWallets = Array<{ wallet: keyof typeof IWallets; handler: () => void}>;

interface IConnectWalletMenuProps {
  className?: string;
  wallets: MenuWallets;
}

const ConnectWalletMenu: FunctionalComponent<IConnectWalletMenuProps> = ({ className, wallets }) => {
  return (
    <div className={className}>
      <img src='../../assets/img/rectangle-wallet-nav.png' alt='wallet' />
      <div className={style['header__wallet_nav_container']}>
        <ListItemsWithSeparator separator={<hr />}>
        {
          wallets.map(({ wallet, handler }) => {
            const { title, iconSrc } = walletsMap[wallet];
            return (
              <div
                key={title}
                className={style['header__wallet_nav_container_item']}
                onClick={handler}
              >
                <img src={iconSrc} alt='wallet' />
                <div>{title}</div>
              </div>
            );
          })
        }
        </ListItemsWithSeparator>
      </div>
    </div>
  );
};

const Header: FunctionalComponent = observer(() => {
    const { web3Provider } = useWalletConnectorContext();

    const { user, wallet, modal, sidebar } = useMst();
    const { address: userAddress } = user;

    const [isLoginInProcess, setIsLoginInProcess] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState<boolean>(false);



    const sideBarHandler = useCallback((): void => {
        sidebar.toggleSidebar(!sidebar.isOpen);
    }, [sidebar])

    const ref = useRef<HTMLHeadingElement>(null);

    const menuHandler = useCallback((): void => {
        setIsMenuOpen(!isMenuOpen)
    }, [isMenuOpen])

    const handleMetamaskLogin = useCallback(async () => {
        // connect('MetaMask');
        setIsLoginInProcess(true);
        setToStorage('walletType', 'metamask');
        wallet.setWalletType('metamask');
        setIsMenuOpen(false);
        // window.location.reload();
    }, [wallet, modal]);

    const handleWalletConnectLogin = useCallback(async () => {
        // connect('WalletConnect');
        setIsLoginInProcess(true);
        setToStorage('walletType', 'walletConnect');
        wallet.setWalletType('walletConnect');
        setIsMenuOpen(false);
    }, [wallet]);

    const wallets: MenuWallets = [
      {
        wallet: 'metamask',
        handler: handleMetamaskLogin,
      }, {
        wallet: 'walletconnect',
        handler: handleWalletConnectLogin,
      },
    ];

    const handleDisconnect = useCallback(async () => {
        const walletTypeInLocalStorage = getFromStorage('walletType');
        if (walletTypeInLocalStorage === 'walletConnect' && web3Provider) {
            web3Provider.disconnect();
        }
        setToStorage('walletType', '');
        setToStorage('accountsWalletConnect', '');
        setToStorage('chainIdWalletConnect', '');
        user.disconnect();
        wallet.setWalletType('');
        setIsMenuOpen(false);
        setIsDisconnectModalOpen(true);
    }, [wallet]);

    useEffect(() => {
        if (user.address) {
            setIsModalOpen(true);
        }
    }, [user.address])

    useEffect(() => {
        if (!isLoginInProcess) return;
        if (!userAddress) return;
        // modal.open({
        //     text: 'WALLET CONNECTED'
        // })
        setIsLoginInProcess(false);
    }, [userAddress, isLoginInProcess])

    useEffect(() => {
        const checkIfClickedOutside = (e: any): void => {
            if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)

        return (): void => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isMenuOpen])

    // useEffect(() => {
    //     const isWalletConnect = localStorage.getItem('walletType') === '"walletConnect"'
    //     let interval;
    //     if (isWalletConnect) {
    //         interval = setInterval(() => {
    //             web3Provider.connect();
    //         }, 8000)
    //     }

    //     return () => {
    //         clearInterval(interval);
    //     }
    // }, [web3Provider]);

    return (
        <header className={`${style.header}`}>
            <div className={style['header__nav_desktop']}>
              <NavLinks activeClassName={style['header__nav_desktop_link--active']} />
            </div>

            <div className={`${style['header__nav_sidebar']} ${sidebar.isOpen ? '' : style.none}`}>
                <img className={style['header__nav_sidebar_bg']} src='../../assets/img/bg.png' alt='bg' />
                <img className={`${style['header__nav_sidebar_tree']} ${!user.address ? style.none : ''}`} src='../../assets/img/tree-sidebar.png' alt='tree' />
                <div className={style['header__nav_sidebar_container']}>
                    <NavLinks activeClassName={style['header__nav_desktop_link--active']} />
                    <div ref={ref} className={`${style['header__nav_sidebar_wallet']}`}>
                        <ConnectWalletMenuHeader
                          className={style['header__nav_sidebar_wallet_title']}
                          containerClassName={style['header__nav_sidebar_wallet_title_container']}
                          isMenuOpen={isMenuOpen}
                          onClick={menuHandler}
                        />
                        {!user.address ?
                          <ConnectWalletMenu
                            className={style['header__nav_sidebar_wallet_nav']}
                            wallets={wallets}
                          /> :
                            <div className={style['header__nav_sidebar_wallet_account']}>
                                <img className={style['header__nav_sidebar_wallet_account_bg']} src='../../assets/img/rectangle-account.png' alt='wallet' />
                                <div className={style['header__wallet_account_container']}>
                                    <WalletAccountContainerHeader />
                                    <div className={style['header__wallet_account_container_main']}>
                                        <h2>{shortenAddress(userAddress)}</h2>
                                        <CopyButton />
                                    </div>
                                    <div
                                      className={style['header__wallet_account_container_footer']}onClick={handleDisconnect}
                                    >
                                      <img src='../../assets/img/icons/disconnect-icon.png' alt='disconnect' />
                                      <h2>Disconnect</h2>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={style['header__nav_sidebar_container_footer']}>
                      <NavLinks
                        className={style["header__nav_sidebar_container_footer-link"]}
                        links={links}
                      />
                    </div>
                </div>
            </div>
            <div onClick={sideBarHandler} className={style['header__nav_mobile']}>
                <img src='../../assets/img/mobile-menu-circle.png' alt='menu' />
                <img className={style['header__nav_mobile_icon']}
                     src={!sidebar.isOpen ? '../../assets/img/mobile-menu-icon-open.png' : '../../assets/img/mobile-menu-icon-close.png'}
                     alt='menu' />
            </div>
            <Link href="/">
              <div className={style['header__logo']}>
                  <img className={style['header__logo_desktop']} src='../../assets/img/crl-logo-2.png' alt='logo' />
                  <img className={style['header__logo_mobile']} src='../../assets/img/logo-mobile.png' alt='logo' />
              </div>
            </Link>
            <div onClick={sideBarHandler} className={style['header__button-mobile']}>
                <h3>{!user.address ? 'Connect' : `${user.address.substr(0, 4)}...${user.address.substr(-2)}`}</h3>
            </div>
            <SomeSvg />
            {!sidebar.isOpen && <div ref={ref} className={`${style['header__wallet']}`}>
                <ConnectWalletMenuHeader
                  className={style['header__wallet_title']}
                  containerClassName={style['header__wallet_title_container']}
                  isMenuOpen={isMenuOpen}
                  onClick={menuHandler}
                />
                {!user.address ? isMenuOpen &&
                  <ConnectWalletMenu className={style['header__wallet_nav']} wallets={wallets} />
                    : isMenuOpen &&
                    <div className={style['header__wallet_account']}>
                        <img src='../../assets/img/rectangle-account.png' alt='wallet' />
                        <div className={style['header__wallet_account_container']}>
                            <img className={style['header__wallet_account_container_close']} onClick={menuHandler}
                                 src='../../assets/img/icons/close-icon.png' alt='close icon' />
                            <WalletAccountContainerHeader />
                            <div className={style['header__wallet_account_container_main']}>
                                <h2>{shortenAddress(userAddress)}</h2>
                                <CopyButton />
                            </div>
                            <div className={style['header__wallet_account_container_footer']}
                                 onClick={handleDisconnect}>
                                <img src='../../assets/img/icons/disconnect-icon.png' alt='disconnect' />
                                <h2>Disconnect</h2>
                            </div>
                        </div>
                    </div>
                }
            </div>}

            {isModalOpen && <ModalConnected
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                title={'Wallet connected'}
                icon={'../../assets/img/img-modal-1.png'}
                bg={'../../assets/img/rectangle-modal-1.png'}
            />}

            {isDisconnectModalOpen && <ModalDisconnect isModalOpen={isDisconnectModalOpen}
                              setIsModalOpen={setIsDisconnectModalOpen} />}
        </header>
    );

})

export default Header;
