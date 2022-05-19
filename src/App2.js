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

export function App2() {
  return <Main products={PRODUCTS} />;
}

function Main(props) {
  const [inputText, setInputText] = useState("");
  const [inputChecked, setinputChecked] = useState(false);

  const handleInputTextChange = (inputText) => {
    setInputText(inputText);
  };

  const handleInputCheckChange = (inputChecked) => {
    setinputChecked(inputChecked);
  };

  return (
    <>
      <InputCheckDiv
        inputText={inputText}
        inputChecked={inputChecked}
        handleInputTextChange={handleInputTextChange}
        handleInputCheckChange={handleInputCheckChange}
      />
      <Body
        products={props.products}
        inputText={inputText}
        inputChecked={inputChecked}
      />
    </>
  );
}

const InputCheckDiv = (props) => {
  const inputText = props.inputText;
  const inputChecked = props.inputChecked;

  function handleInputTextChange(e) {
    props.handleInputTextChange(e.target.value);
  }

  function handleInputCheckChange(e) {
    props.handleInputCheckChange(e.target.checked);
  }

  return (
    <>
      <form>
        <input type="text" value={inputText} onChange={handleInputTextChange} />
        <p>
          <input
            type="checkbox"
            value={inputChecked}
            onChange={handleInputCheckChange}
          />
          Only display items in stock
        </p>
      </form>
    </>
  );
};
const Body = (props) => {
  const rows = [];
  const text = props.inputText;
  const checkFlagCheckbox = props.inputChecked;
  let prevCategory = null;

  props.products.forEach((product) => {
    if (product.name.indexOf(text) === -1) return;

    if (checkFlagCheckbox && !product.stocked) return;

    if (props.category !== prevCategory) {
      rows.push(
        <ProductHeading product={product.category} key={product.category} />
      );
    }

    rows.push(
      <ProductBody
        product={product}
        checkFlagCheckbox={checkFlagCheckbox}
        key={product.name}
      />
    );

    prevCategory = props.category;
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
};

const ProductHeading = (props) => {
  const heading = props.category;
  return (
    <tr>
      <th colSpan="2">{heading}</th>
    </tr>
  );
};

const ProductBody = (props) => {
  const product = props.product;
  console.log(product.stocked + " " + props.checkFlagCheckbox);
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
};
