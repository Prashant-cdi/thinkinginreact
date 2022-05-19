// import logo from "./logo.svg";
import "./App.css";
// import { PRODUCTS } from "./products";
// import { FilterableProductTable } from "./FilterableProductTable";
import { useState } from "react";

const PRODUCTS = [
  {
    category: "Sporting Goods",
    price: "$49.99",
    stocked: true,
    name: "Football",
  },
  {
    category: "Sporting Goods",
    price: "$9.99",
    stocked: true,
    name: "Baseball",
  },
  {
    category: "Sporting Goods",
    price: "$29.99",
    stocked: false,
    name: "Basketball",
  },
  {
    category: "Electronics",
    price: "$99.99",
    stocked: true,
    name: "iPod Touch",
  },
  {
    category: "Electronics",
    price: "$399.99",
    stocked: false,
    name: "iPhone 5",
  },
  {
    category: "Electronics",
    price: "$199.99",
    stocked: true,
    name: "Nexus 7",
  },
];

export function App() {
  console.log("hello1");
  return <FilterableProductTable products={PRODUCTS} />;
}

// <ProductRow products={product} key={product.name} />
function ProductRow(props) {
  const product = props.product;
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// <ProductCategoryRow
//           category={product.category}
//           key={product.category}
//         />
function ProductCategoryRow(props) {
  const category = props.category;
  return (
    <tr>
      <th colSpan="2">{category}</th>
    </tr>
  );
}

// <ProductTable
//         products={props.products}
//         filterText={filterText}
//         inStockOnly={inStockOnly}
//       />
function ProductTable(props) {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;

  const rows = [];
  let lastCategory = null;

  props.products.forEach((product) => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }

    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

// <SearchBar
//         filterText={filterText}
//         inStockOnly={inStockOnly}
//         onFilterTextChange={handleFilterTextChange}
//         onInStockChange={handleInStockChange}
//       />

function SearchBar(props) {
  function handleFilterTextChange(e) {
    props.onFilterTextChange(e.target.value);
  }

  function handleInStockChange(e) {
    props.onInStockChange(e.target.checked);
  }

  return (
    <form>
      <input
        type="text"
        placeholder="Search..."
        value={props.filterText}
        onChange={handleFilterTextChange}
      />
      <p>
        <input
          type="checkbox"
          checked={props.inStockOnly}
          onChange={handleInStockChange}
        />
        Only show products in stock
      </p>
    </form>
  );
}

function FilterableProductTable(props) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  function handleFilterTextChange(filterText) {
    setFilterText(filterText);
  }

  function handleInStockChange(inStockOnly) {
    setInStockOnly(inStockOnly);
  }

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={handleFilterTextChange}
        onInStockChange={handleInStockChange}
      />

      <ProductTable
        products={props.products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  );
}
