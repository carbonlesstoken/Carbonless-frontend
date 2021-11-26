import { FunctionalComponent, h } from "preact";

import { Progress, Video } from "../index";

import style from "./style.scss";

import info from "./mock";
import { useMst } from "../../store/store";
import { getTokenAmountDisplay } from "../../utils";

const ProjectInfo: FunctionalComponent = () => {
  const {crlToken} = useMst();
  return (
    <div className={style.info}>
      <div className={style["info__block-top"]}>
        <div className={style["info__block-top_card_1"]}>
          <div>
            <h2 className={style["info__title"]}>{info.title}</h2>
            <h3 className={style["info__desc"]}>{info.description}</h3>
          </div>
          <img
            className={style["info__block-top_card_1_desktop"]}
            src="../../assets/img/rectangle-card-1.png"
            alt=""
          />
          {/*<img className={style['info__block-top_card_1_bg']} src='../../assets/img/rectangle-card-1-bg.png'*/}
          {/*     alt='card 1 rectangle'/>*/}
          <img
            className={style["info__block-top_card_1_leaf-1"]}
            src="../../assets/img/leafs-2.svg"
            alt="leaf 1"
          />
          <img
            className={style["info__block-top_card_1_leaf-2"]}
            src="../../assets/img/leafs-3.svg"
            alt="leafs 2"
          />
          <img
            className={style["info__block-top_card_1_tree-mobile"]}
            src="../../assets/img/tree-1-mobile.png"
            alt="tree"
          />
        </div>
        <div className={style["info__block-top_card_2"]}>
          <div className={style["info__block-top_card_2_container"]}>
            <h2 className={style["info__title"]}>2.5%</h2>
            <h2 className={style["info__subtitle"]}>TOKEN KEY FEATURES</h2>
            <ul className={style["info__desc"]}>
              {info.featuresList.map(({ value, name }) => {
                return (
                  <li key={name + String(value)} className={style["info__desc-content"]}>
                    <div className={style["info__desc-value"]}>{value}%</div>
                    <div>{name}</div>
                  </li>
                )
              })}
            </ul>
            <img
              className={style["info__block-top_card_2_tree"]}
              src="../../assets/img/tree-2.png"
              alt="tree 2"
            />
          </div>
          <img
            className={style["info__block-top_card_2_bg"]}
            src="../../assets/img/rectangle-card-2.png"
            alt="card 2 rectangle"
          />
        </div>

        <svg
          style="visibility: hidden; position: absolute;"
          width="0"
          height="0"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="25"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
                result="goo"
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>

      <Video />

      <div className={style["info__block-bottom"]}>
        <div className={style.bottomCardBlock}>
          <div className={style["info__block-bottom_card_1"]}>
            <div>
              <h2>Bonuses info</h2>
              <h3>Buy Over 10 Million Crl At Once And Get Extra 4%</h3>
            </div>
            <img
              src="../../assets/img/rectangle-card-3.png"
              alt="card 3 rectangle"
            />
          </div>
          <div className={style["info__block-bottom_card_1"]}>
            <div>
              <h2>{`${getTokenAmountDisplay(crlToken.price, 9)}$`}</h2>
              <h3>Current CRL price</h3>
            </div>
            <img
              src="../../assets/img/rectanglePrice.png"
              alt="card 3 rectangle"
            />
          </div>
        </div>
        <Progress />
      </div>
    </div>
  );
};

export default ProjectInfo;
