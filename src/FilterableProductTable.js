import { SearchBar } from "./SearchBar";
import { ProductTable } from "./ProductTable";

export function FilterableProductTable(props) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={props.products} />
    </div>
  );
}
