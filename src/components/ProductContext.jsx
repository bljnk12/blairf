import React, { createContext, useState, useEffect } from "react";
//import items from '../productos/productos.json';

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const Products = () => {
      getFrutas();
    };
    Products();
  }, []);

  let getFrutas = async () => {
    let response = await fetch("http://localhost:8000/blairfoodsb/frutas/");
    let data = await response.json();
    setProducts(data);
    // console.log(data)
  };

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
