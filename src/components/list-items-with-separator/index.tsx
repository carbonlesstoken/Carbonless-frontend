import { Fragment, FunctionalComponent, h, toChildArray } from "preact";

interface IListItemsWithSeparatorProps {
  separator?: h.JSX.Element;
}

const ListItemsWithSeparator: FunctionalComponent<IListItemsWithSeparatorProps> =
  ({ children, separator = <br /> }) => {
    const childrenArray = toChildArray(children);
    const lastIndex = childrenArray.length - 1;
    return (
      <Fragment>
        {childrenArray.map((child, index) => {
          if (index === lastIndex) return child;
          return (
            <Fragment>
              {child}
              {separator}
            </Fragment>
          );
        })}
      </Fragment>
    );
  };

export default ListItemsWithSeparator;
