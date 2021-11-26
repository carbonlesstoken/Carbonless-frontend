import { FunctionalComponent, h } from "preact";
import { useEffect } from "preact/hooks";
import { observer } from "mobx-react-lite";

import { useMst } from "../../store/store";
import Content from "../../containers/FaqPage/Content";

const FaqPage: FunctionalComponent = observer(() => {
  const { sidebar } = useMst();

  useEffect(() => {
    if (sidebar.isOpen) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
  }, [sidebar.isOpen]);

  return (
    <Content />
  );
});

export default FaqPage;
