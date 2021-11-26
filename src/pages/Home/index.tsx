import { Fragment, FunctionalComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { observer } from "mobx-react-lite";

import {
  About,
  Addresses,
  BuyNow,
  PopupPreloader,
  ProjectInfo,
  Team,
} from "../../components";
import { useMst } from "../../store/store";

const HomePage: FunctionalComponent = observer(() => {
  const { sidebar } = useMst();

  useEffect(() => {
    if (sidebar.isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [sidebar.isOpen]);

  return (
    <Fragment>
      <About />
      <ProjectInfo />
      <BuyNow />
      <Addresses />
      <Team />
    </Fragment>
  );
});

export default HomePage;
