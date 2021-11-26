import { FunctionalComponent, h } from "preact";

import style from "./style.scss";

const About: FunctionalComponent = () => {
  return (
    <div className={style.about}>
      <div className={style["about__block-1"]}>
        <h1>
          <span>A new era of</span> CRL <span>utility</span>
        </h1>
        <h2>Carbonless Max Supply 1,000,000,000,000,000 CRL</h2>
        <a href="#buy">
          <div>
            <h3>Buy</h3>
            <img src="../../assets/img/rectangle-button.png" alt="" />
          </div>
        </a>
      </div>
      <div className={style["about__block-2"]}>
        <img src="../../assets/img/tree-bg.png" alt="" />
        <img src="../../assets/img/tree-1.png" alt="" />
        <img src="../../assets/img/tree-1-shadow.svg" alt="" />
        <img src="../../assets/img/leafs-1.svg" alt="" />
      </div>
    </div>
  );
};

export default About;
