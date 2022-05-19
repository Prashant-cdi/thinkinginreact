import { ProductCategoryRow } from "./ProductCategoryRow";
import { ProductRow } from "./ProductRow";
export function ProductTable(props) {
  const rows = [];
  let lastCategory = null;
  props.products.forEach((product) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);

    lastCategory = product.category

  });

  return (
    <table>
      <thead>
        <tr>
          <td>Name</td>
          <td>Price</td>
        </tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  );
}
