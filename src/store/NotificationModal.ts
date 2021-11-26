import { types } from 'mobx-state-tree';

export const NotificationModal = types
    .model({
        isOpen: types.boolean,
        type: types.string,
        result: types.string,
        func: types.string,

    })
    .actions((self) => {
        const open = (): void => {
            self.isOpen = true;
        };

        const close = (): void => {
            self.isOpen = false;
        };

        const setType = (type: string): void => {
            self.type = type
        }

        const setResult = (result: string): void => {
            self.result = result
        }

        const setFunc = (func: string): void => {
            self.func = func
        }

        return {
            open,
            close,
            setType,
            setResult,
            setFunc
        };
    });