import { Fragment, FunctionalComponent, h } from "preact";

import styles from "./styles.scss";
import { Link } from "preact-router/match";

export interface INavLink {
  link: string;
  text: string;
  external?: boolean;
  props?: h.JSX.HTMLAttributes<HTMLAnchorElement> &
    preact.ComponentProps<typeof Link>;
}

export const defaultLinks: INavLink[] = [
  {
    link: "https://dev3-carbonless.mywish.io/whitepaper/",
    text: "Whitepaper",
    external: true,
  },
  {
    link: "https://github.com/carbonlesstoken/carbonlesstoken",
    text: "Github",
    external: true,
  },
  {
    link: "/faq",
    text: "Faq",
  },
];

export interface INavLinksProps {
  className?: string;
  activeClassName?: string;
  links?: INavLink[];
}

const NavLinks: FunctionalComponent<INavLinksProps> = ({
  className,
  activeClassName,
  links = defaultLinks,
}) => {
  return (
    <Fragment>
      {links.map(({ link, text, external = false, props = {} }) => {
        if (external) {
          const commonProps = {
            className,
            rel: "noreferrer",
            target: "_blank",
            href: link,
            ...props,
          };
          return text ? <a {...commonProps}>{text}</a> : <a {...commonProps} />;
        }

        const commonProps = {
          className,
          activeClassName,
          href: link,
          ...props,
        };
        return text ? (
          <Link {...commonProps}>{text}</Link>
        ) : (
          <Link {...commonProps} />
        );
      })}
    </Fragment>
  );
};
export default NavLinks;
