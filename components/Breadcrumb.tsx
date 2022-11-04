import Link from "next/link";
import { useBreadcrumb } from "react-instantsearch-hooks-web";

export const Breadcrumbs = () => {
  const { items } = useBreadcrumb({
    attributes: [
      "hierarchicalCategories.lvl0",
      "hierarchicalCategories.lvl1",
      "hierarchicalCategories.lvl2"
    ]
  });
  console.log(items, "breadcrumbs rerender");
  return (
    <div>
      <h3>Breadcrumbs(useBreadcrumb)</h3>
      {items.map((item, index) => {
        return (
          <div key={index}>
            <Link href={`/${item.value}`}>{item.label}</Link>
          </div>
        );
      })}
    </div>
  );
};
