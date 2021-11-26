import { Fragment, FunctionalComponent, h } from "preact";
import { Link } from "preact-router";

import { links } from "./mock";
import { NavLinks } from "..";

import style from "./style.scss";

const Footer: FunctionalComponent = () => {
  return (
    <div className={style.footer}>
      <img
        className={style["footer__img"]}
        src="../../assets/img/footer-rectangle.png"
        alt="rectangle footer"
      />
      <div className={style["footer__container"]}>
        <div className={style["footer__container_block-1"]}>
          <div className={style["footer__container_block-1_info"]}>
            <div className={style["footer__container_block-1_info-links"]}>
              <NavLinks
                className={style["footer__container_block-1_info-link"]}
              />
            </div>
          </div>
          <div className={style["footer__container_block-1_icons"]}>
            <NavLinks className={style["footer__container_block-1_icons-link"]} links={links} />
          </div>
          <h2 className={style["footer__title_desktop"]}>
            CRL © 2021 All rights reserved.
          </h2>
        </div>
        <div className={style["footer__container_block-2"]}>
          <a target="_blank" rel="noreferrer" href="https://rocknblock.io">
            <img
              className={style["footer__container_block-2_desktop"]}
              src="../../assets/img/powered-by-rnb.svg"
              alt="rock n block"
            />
            <img
              className={style["footer__container_block-2_mobile"]}
              src="../../assets/img/powered-by-rnb-mobile.svg"
              alt="rock n block"
            />
          </a>
        </div>

        <h2 className={style["footer__title_mobile"]}>
          CRL © 2021 All rights reserved.
        </h2>
      </div>
    </div>
  );
};

export default Footer;
