import { h } from "preact";
import { Router } from "preact-router";
import { ToastContainer } from "react-toastify";

import { HomePage, FaqPage } from "../pages";
import { Footer, Header, PopupPreloader } from "./index";
import { Provider, rootStore } from "../store/store";
import Connector from "../contexts/WalletConnect";
import WalletConnect from "../services2/walletConnect";
import Modal from "./modal";

import "react-toastify/dist/ReactToastify.css";
import "../style/index.scss";
import "../style/common/buttons.scss";

import { usePreloader } from "../hook";

const App = () => {
  const { isLoading } = usePreloader();
  return (
    <div id="preact_root">
      {/*@ts-ignore*/}
      <Provider value={rootStore}>
        <WalletConnect>
          <Connector>
            {isLoading && <PopupPreloader />}
            <Header />
            <Router>
              <HomePage path="/" />
            </Router>
            <Router>
              <FaqPage path="/faq" />
            </Router>
            <Footer />
            <Modal />
            {/*@ts-ignore*/}
            <ToastContainer />
          </Connector>
        </WalletConnect>
      </Provider>
    </div>
  );
};

export default App;
