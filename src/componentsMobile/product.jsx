import { useState, useEffect, useContext, useRef } from "react";
import { CartContext } from "../components/CartContext";
import basket from "./media/shopping-basket.svg";

export default function Product({ product, close }) {
  const { cart, addToCartD } = useContext(CartContext);

  const {
    id,
    categoria,
    imagen,
    nombre,
    unidadVenta1,
    precioUVenta1,
    unidadVenta2,
    precioUVenta2,
  } = product;

  const [dropdownRef5, setDD5] = useState(false);

  const showDD5 = () => {
    setDD5(!dropdownRef5);
  };

  const [elementVisible, setElementVisible] = useState(false);
  // const [elementVisible2, setElementVisible2] = useState(false);

  useEffect(() => {
    if (categoria === 1) {
      setElementVisible(true);
    }
    if (categoria === 2) {
      setElementVisible(false);
    }
    if (categoria === 3) {
      setElementVisible(false);
    }
    if (categoria === 4) {
      setElementVisible(false);
    }
    if (categoria === 5) {
      setElementVisible(false);
    }
    if (categoria === 6) {
      setElementVisible(false);
    }
    if (categoria === 7) {
      setElementVisible(false);
    }
    if (categoria === 8) {
      setElementVisible(false);
    }
    if (categoria === 9) {
      setElementVisible(false);
    }
    if (categoria === 10) {
      setElementVisible(false);
    }
  }, [categoria]);

  // const abrir = () => {
  //   setVis()
  //   dropdownRef5.current.open()
  // }

  // const showData = () => {
  //   console.log(unidadVenta2)
  // }

  // const url = 'https://blairfoods01-production.up.railway.app'+imagen

  const [cantidad, setCantidad] = useState(1);

  const sumar = (id) => {
    var numero = cantidad;
    var sumar = ++numero;
    setCantidad(sumar);
  };

  const restar = (id) => {
    if (cantidad > 1) {
      var numero = cantidad;
      var restar = --numero;
      setCantidad(restar);
    } else {
    }
  };

  const [unidad, setUnidad] = useState(unidadVenta1);

  const [precio, setPrecio] = useState(precioUVenta1);

  const unidad1 = () => {
    setUnidad(unidadVenta1);
  };

  const unidad2 = () => {
    setUnidad(unidadVenta2);
  };

  const fijarPrecio = () => {
    if (unidad === unidadVenta1) {
      setUnidad(unidadVenta1);
      setPrecio(precioUVenta1);
    }
    if (unidad === unidadVenta2) {
      setUnidad(unidadVenta2);
      setPrecio(precioUVenta2);
    }
  };

  useEffect(() => {
    fijarPrecio();
  }, [cantidad, unidad]);

  const total2 = cantidad * precio;

  const [maduracion, setMad] = useState(categoria === 1 ? "semimaduro" : "N/a");

  const baja = () => {
    setMad("verde");
  };

  const media = () => {
    setMad("semimaduro");
  };

  const alta = () => {
    setMad("maduro");
  };

  const anadir = () => {
    const itemId = id;
    const newCart = [...cart].map((item) => item.id);
    let resultado = newCart.includes(itemId);
    if (resultado === true) {
      alert("El producto ya se encuentra en la canasta!");
    }
    if (precio === 0) {
      alert("Selecciona precio!!!");
    }
    if (precio && precio !== 0 && resultado === false) {
      addToCartD(product, id, cantidad, unidad, precio, total2, maduracion);
      alert("El producto ha sido agregado a la canasta!");
    }
    setDD5(false);
  };

  // const showData = () => {
  //   console.log(maduracion)
  // }

  const detail = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (detail.current && !detail.current.contains(event.target)) {
        setDD5(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detail]);

  return (
    <>
      <div className="product">
        <div className="product-img">
          <img src={imagen} width={80} height={80} alt="" />
        </div>
        <div className="product-info">
          <div className="product-nombre">{nombre}</div>
          <div className="product-info-a">
            <div className="product-price">
              <div className="producto-unidad">Precio por {unidadVenta1}</div>
              <div className="precio-uno">${precioUVenta1}</div>
            </div>
            <div className="product-btn">
              <button onClick={showDD5} className="agregar-boton">
                Agregar
                <img src={basket} width={20} height={20} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {dropdownRef5 && (
        <div className="slide-menu-product" ref={detail}>
          <div className="product-detail">
            <div className="product-detail-nombre">{nombre}</div>
            <img src={imagen} width={150} alt="" />
            <div className="pd-ppp">
              <div
                className="pd-ppp1"
                style={{ marginInline: unidadVenta2 ? "10px" : 0 }}
              >
                <p className="pd-pp">{unidadVenta1}</p>
                <p className="pd-p">${precioUVenta1}</p>
              </div>
              {unidadVenta2 ? (
                <div className="pd-ppp2" style={{ marginInline: "10px" }}>
                  <p className="pd-pp">{unidadVenta2}</p>
                  <p className="pd-p">${precioUVenta2}</p>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="product-opciones">
              <button
                onClick={unidad1}
                style={{
                  backgroundColor:
                    unidad === unidadVenta1 ? "#feebc8" : "white",
                  border: unidad === unidadVenta1 ? "none" : "1px solid grey",
                }}
              >
                {unidadVenta1}
              </button>
              {unidadVenta2 ? (
                <button
                  onClick={unidad2}
                  style={{
                    backgroundColor:
                      unidad === unidadVenta2 ? "#feebc8" : "white",
                    border: unidad === unidadVenta2 ? "none" : "1px solid grey",
                  }}
                >
                  {unidadVenta2}
                </button>
              ) : null}
            </div>

            {elementVisible ? (
              <div className="producto-maduracion">
                <div className="nivel-maduracion">
                  <button
                    className="nm-one"
                    onClick={baja}
                    style={{
                      backgroundColor:
                        maduracion === "verde" ? "#c6f6d5" : "white",
                    }}
                  >
                    Baja
                  </button>
                  <button
                    className="nm-two"
                    onClick={media}
                    style={{
                      backgroundColor:
                        maduracion === "semimaduro" ? "#feebc8" : "white",
                    }}
                  >
                    Media
                  </button>
                  <button
                    className="nm-three"
                    onClick={alta}
                    style={{
                      backgroundColor:
                        maduracion === "maduro" ? "#fbd38d" : "white",
                    }}
                  >
                    Alta
                  </button>
                </div>
              </div>
            ) : null}

            <div className="product-cantidad">
              <button onClick={restar}>
                <i class="fa-solid fa-minus"></i>
              </button>
              <p>{cantidad}</p>
              <button onClick={sumar}>
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>

            <p className="product-total">${total2}</p>

            <div className="añadir-btn">
              {/* <button mt={10} bg='orange400' w={150} rounded={10} onClick={showData}> */}
              <button onClick={anadir} className="añadir-boton">
                <p>Agregar a mi canasta</p>
                <img src={basket} width={20} height={20} alt="" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
