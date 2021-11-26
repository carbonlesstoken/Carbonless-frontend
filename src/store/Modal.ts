import { types } from 'mobx-state-tree';

export const Modal = types
    .model({
        isOpen: types.boolean,
        text: types.string,
        noCloseButton: types.union(types.boolean, types.undefined),
        fullPage: types.union(types.boolean, types.undefined),
        header: types.union(types.string, types.undefined),
        delay: types.union(types.number, types.undefined),
    })
    .actions((self) => {
        const open = (props: any): void => {
            const { text, noCloseButton, fullPage, header, delay } = props;
            self.isOpen = true;
            self.text = text;
            self.noCloseButton = noCloseButton;
            self.fullPage = fullPage;
            self.header = header;
            self.delay = delay;
        };

        const close = (): void => {
            self.isOpen = false;
            self.text = '';
        };

        return {
            open,
            close,
        };
    });