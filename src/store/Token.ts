import {types} from "mobx-state-tree";

export const CrlToken = types
    .model({
        price: types.string,
        sold: types.string,
        endTime: types.string,
    })
    .actions((self) => {

        const setTokenPrice = (price: string): void => {
            self.price = price;
        };

        const setTokenSold = (sold: string): void => {
            self.sold = sold;
        };

        const setTokenEndTime = (endTime: string): void => {
            self.endTime = endTime;
        };

        return {
            setTokenPrice,
            setTokenSold,
            setTokenEndTime,
        };
    });