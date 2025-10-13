import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../components/ProductContext";

function ItemCAI({ item }) {
  const { producto, unidad, precio, cantidad } = item;

  const { products } = useContext(ProductContext);

  const product = products.find((item) => {
    return item.id === producto;
  });

  const [unidadShort, setUnidadShort] = useState("");

  useEffect(() => {
    if (unidad === "Pieza") {
      setUnidadShort("Pz.");
    }
    if (unidad === "Manojo") {
      setUnidadShort("Man.");
    }
    if (unidad === "Kg") {
      setUnidadShort(unidad);
    }
    if (unidad === "500g") {
      setUnidadShort(".5Kg");
    }
  }, [unidad]);

  const subFixed = (precio * cantidad).toFixed(2);

  return (
    <div className="orden-items-cai">
      <div className="oi-cai-1">
        <img
          className="ci-image"
          width={50}
          height={50}
          src={product.imagen}
          alt=""
        />
      </div>
      <div className="oi-cai-2">{product.nombre}</div>
      <div className="oi-cai-3">
        <div className="oi-caa-qc">{cantidad}</div>
        <div className="oi-caa-qu">{unidadShort}</div>
      </div>
      <div className="oi-cai-4">{precio}</div>
      <div className="oi-cai-5">{subFixed}</div>
    </div>
  );
}

export default ItemCAI;
