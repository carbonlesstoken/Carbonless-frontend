import {types} from "mobx-state-tree";

export const Sidebar = types
    .model({
        isOpen: types.boolean,
    })
    .actions((self) => {

        const toggleSidebar = (isOpen: boolean): void => {
            self.isOpen = isOpen;
        };

        return {
            toggleSidebar,
        };
    });