import { createContext, useContext } from 'react';
import { Instance, onSnapshot, types } from 'mobx-state-tree';

import { User } from './User';
import { Wallet } from "./Wallet";
import { Modal } from "./Modal";
import {CrlToken} from "./Token";
import {Sidebar} from "./Sidebar";
import {NotificationModal} from "./NotificationModal";

const RootModel = types.model({
    user: User,
    wallet: Wallet,
    modal: Modal,
    crlToken: CrlToken,
    sidebar: Sidebar,
    notificationModal: NotificationModal
});

export const Store = RootModel.create({
    user: {
        address: '',
        balance: '0',
        balances: {
            CRL: '0',
            USDT: '0',
            BUSD: '0',
        },
    },
    modal: {
        isOpen: false,
        text: '',
        noCloseButton: undefined,
        fullPage: undefined,
        header: undefined,
        delay: undefined,
    },
    wallet: {
        chainId: '',
        type: '',
    },
    crlToken: {
        price: '500000',
        sold: '0',
        endTime: ''
    },
    sidebar: {
        isOpen: false,
    },
    notificationModal: {
        isOpen: false,
        type: '',
        result: '',
        func: ''
    }
});

export const rootStore = Store;

onSnapshot(rootStore, (snapshot) => {
    console.log('Snapshoot:', snapshot);
});

export type RootInstance = Instance<typeof RootModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const { Provider } = RootStoreContext;

export const useMst = () => {
    const store = useContext(RootStoreContext);
    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider');
    }
    return store;
}