import { useContext } from "react";
import { ProductContext } from "./ProductContext";

function ItemPA({ item }) {
  const { producto, unidad, precio, cantidad } = item;

  return (
    <div className="orden-items-pa">
      <div className="oi-1">{producto.nombre}</div>
      <div className="oi-2">{unidad}</div>
      <div className="oi-3">{precio}</div>
      <div className="oi-4">{cantidad}</div>
    </div>
  );
}

export default ItemPA;
