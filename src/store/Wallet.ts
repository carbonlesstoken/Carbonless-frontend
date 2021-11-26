import { types } from 'mobx-state-tree';

export const Wallet = types
    .model({
        type: types.string,
        chainId: types.string,
    })
    .actions((self) => {

        const setWalletType = (type: string): void => {
            self.type = type;
        };

        const setChainId = (chainId: string): void => {
            self.chainId = chainId;
        };

        return {
            setWalletType,
            setChainId,
        };
    });