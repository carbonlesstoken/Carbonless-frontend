import { types } from 'mobx-state-tree';

const BalancesType = types.model({
    CRL: types.optional(types.string, '0'),
    USDT: types.optional(types.string, '0'),
    BUSD: types.optional(types.string, '0'),
}).actions((self) => ({
    //
}))

export const User = types
    .model({
        address: types.string,
        balance: types.string,
        balances: BalancesType
    })
    .actions((self) => {

        const login = (props: any): void => {
            const { address, balance } = props;
            self.address = address;
            self.balance = balance;
        };

        const disconnect = (): void => {
            self.address = '';
            self.balance = '';
        };

        const setAddress = (address: string): void => {
            self.address = address;
        };

        const setBalance = (value: string): void => {
            self.balance = value;
        };

        const setBalances = (value: any): void => {
            self.balances = { ...self.balances, ...value };
        };

        return {
            login,
            disconnect,
            setAddress,
            setBalance,
            setBalances,
        };
    });