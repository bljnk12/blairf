import { useEffect, useState } from "react";

function ItemCAA({ item }) {
  const { id, unidad, precio, preciof, cantidad, cantidadf } = item;

  const [upPrecio, setUpPrecio] = useState(false);
  const [downPrecio, setDownPrecio] = useState(false);
  const [upCantidad, setUpCantidad] = useState(false);
  const [downCantidad, setDownCantidad] = useState(false);
  // const [upSub, setUpSub] = useState(false);
  // const [downSub, setDownSub] = useState(false);

  useEffect(() => {
    if (precio > preciof) {
      setDownPrecio(true);
    }
    if (precio < preciof) {
      setUpPrecio(true);
    }
    if (cantidad > cantidadf) {
      setDownCantidad(true);
    }
    if (cantidad < cantidadf) {
      setUpCantidad(true);
    }
    // if (cantidad * precio > cantidadf * preciof) {
    //   setDownSub(true);
    // }
    // if (cantidad * precio < cantidadf * preciof) {
    //   setUpSub(true);
    // }
  }, [cantidad, precio, cantidadf, preciof]);

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

  const subFixedf = (preciof * cantidadf).toFixed(2);

  const [marcado, setMarcado] = useState(false);

  const eliminar = () => {
    setMarcado(true);
    deleteItem();
  };

  let deleteItem = async () => {
    fetch(`http://localhost:8000/blairfoodsb/item/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <div className="orden-items-caa">
      <div className="oi-caa-1">
        <div className="oi-caa-qc">{cantidadf}</div>
        <div className="oi-caa-qu">{unidadShort}</div>
        {downCantidad === true ? <i class="fa-solid fa-arrow-down"></i> : <></>}
        {upCantidad === true ? <i class="fa-solid fa-arrow-up"></i> : <></>}
      </div>
      <div className="oi-caa-2">
        <div>{preciof}</div>
        {downPrecio === true ? <i class="fa-solid fa-arrow-down"></i> : <></>}
        {upPrecio === true ? <i class="fa-solid fa-arrow-up"></i> : <></>}
      </div>
      <div className="oi-caa-3">
        <div>{subFixedf}</div>
      </div>
      <div className="oi-caa-4">
        <i
          class="fa-solid fa-circle-xmark"
          onClick={eliminar}
          style={{ color: marcado === true ? "#f56565" : "#cbd5e0" }}
        ></i>
      </div>
    </div>
  );
}

export default ItemCAA;
