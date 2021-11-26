import {toast} from "react-toastify";

interface NotifyProps {
    (text: string, type?: string);
}

export const notify: NotifyProps = (text: string, type = 'success') => {
    toast[type](text, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
}

