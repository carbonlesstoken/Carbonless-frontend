import { FunctionalComponent, h } from "preact";
import { observer } from "mobx-react-lite";

import { useMst } from "../../../store/store";
import { shortenAddress } from "../helpers";

import style from "./../style.scss";
import SomeSvg from "../some-svg";

interface IConnectWalletMenuHeaderProps {
  className?: string;
  containerClassName?: string;
  isMenuOpen?: boolean;
  onClick?: () => void;
}
const _ConnectWalletMenuHeader: FunctionalComponent<IConnectWalletMenuHeaderProps> =
  ({ className, containerClassName, isMenuOpen = false, onClick }) => {
    const { user } = useMst();
    const { address: userAddress } = user;
    return (
      <div onClick={onClick} className={className}>
        <div className={containerClassName}>
          <div>
            {!userAddress ? "Connect wallet" : shortenAddress(userAddress)}
          </div>
          <img
            className={isMenuOpen ? style["rotate180"] : ""}
            src="../../assets/img/wallet-arrow-top.svg"
            alt="arrow top"
          />
        </div>
        <SomeSvg />
      </div>
    );
  };

const ConnectWalletMenuHeader = observer(_ConnectWalletMenuHeader);

export default ConnectWalletMenuHeader;
