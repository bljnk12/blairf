import { useContext } from "react";
import { ProductContext } from "./ProductContext";

function ItemCA({ item }) {
  const { producto, unidad, precio, cantidad } = item;

  const { products } = useContext(ProductContext);

  const product = products.find((item) => {
    return item.id === producto;
  });

  const subFixed = (precio * cantidad).toFixed(2);

  return (
    <div className="orden-items">
      <div className="oi-1">{product.nombre}</div>
      <div className="oi-2">{unidad}</div>
      <div className="oi-3">${precio}</div>
      <div className="oi-4">{cantidad}</div>
      <div className="oi-5">${subFixed}</div>
    </div>
  );
}

export default ItemCA;
