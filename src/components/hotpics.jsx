import React, { useContext } from "react";
import { ProductContext } from "./ProductContext";
import Product from "./product";

export default function HotPics() {
  const { products } = useContext(ProductContext);

  const pic1 = products.filter((product) => product.id === 1);
  const pic2 = products.filter((product) => product.id === 2);
  const pic3 = products.filter((product) => product.id === 3);
  const pic4 = products.filter((product) => product.id === 4);
  const pic5 = products.filter((product) => product.id === 5);
  const pic6 = products.filter((product) => product.id === 6);
  const pic7 = products.filter((product) => product.id === 7);
  const pic8 = products.filter((product) => product.id === 8);
  const pic9 = products.filter((product) => product.id === 9);
  const pic10 = products.filter((product) => product.id === 10);
  const pic11 = products.filter((product) => product.id === 11);
  const pic12 = products.filter((product) => product.id === 12);
  const pic13 = products.filter((product) => product.id === 13);
  const pic14 = products.filter((product) => product.id === 14);
  const pic15 = products.filter((product) => product.id === 15);

  return (
    <div className="hotpics">
      <div className="pics-container">
        {pic1.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic2.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic3.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic4.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic5.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic6.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic7.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic8.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic9.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic10.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic11.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic12.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic13.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic14.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
        {pic15.map((product) => {
          return <Product product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
}
