import React, { useState, useContext, useEffect, useRef } from "react";
import up from "./media/chevron-up.svg";
import down from "./media/chevron-down.svg";
import { CartContext } from "../components/CartContext";

const Product = ({ product }) => {
  const { cart, addToCartD, total } = useContext(CartContext);

  const {
    id,
    categoria,
    imagen,
    nombre,
    unidadVenta1,
    precioUVenta1,
    unidadVenta2,
    precioUVenta2,
    uVMayoreo,
    precioMayoreo,
  } = product;

  const [showTest, setShowTest] = useState(false);

  const showTestBtn = () => {
    setShowTest(!showTest);
  };

  function closeTest() {
    setShowTest(false);
    setUnidad(unidadVenta1);
    setPrecio(precioUVenta1); //test
  }

  const detail = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (detail.current && !detail.current.contains(event.target)) {
        closeTest();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [detail]);

  //----------------------------------------

  // const [catName, setCatName] = useState()

  // const fijarCatName = () => {
  //     if( categoria === 1) {
  //         setCatName("Frutas")
  //     }
  //     if( categoria === 2) {
  //         setCatName("Verduras")
  //     }
  //     if( categoria === 3) {
  //         setCatName("Chiles secos")
  //     }
  //     if( categoria === 4) {
  //         setCatName("Frutos secos y semillas")
  //     }
  //     if( categoria === 5) {
  //         setCatName("Especias")
  //     }
  //     if( categoria === 6) {
  //         setCatName("Cereales y leguminosas")
  //     }
  // }

  // useEffect(()=>{
  //     fijarCatName()
  // },[categoria])

  const [cat, setCat] = useState(false);

  useEffect(() => {
    if (categoria === 1) {
      setCat(true);
    }
  }, [categoria]);

  const [cantidad, setCantidad] = useState(1);

  const sumar = (id) => {
    var numero = cantidad;
    var sumar = ++numero;
    setCantidad(sumar, id);
  };

  const restar = (id) => {
    if (cantidad > 1) {
      var numero = cantidad;
      var restar = --numero;
      setCantidad(restar, id);
    } else {
    }
  };

  const [unidad, setUnidad] = useState(unidadVenta1);

  const [precio, setPrecio] = useState(precioUVenta1);

  const fijarPrecio = () => {
    const valor1 = document.getElementById("u-venta");
    const valor2 = valor1?.value;
    if (valor2 === "1") {
      setUnidad(unidadVenta1);
      setPrecio(precioUVenta1);
    }
    if (valor2 === "2") {
      setUnidad(unidadVenta2);
      setPrecio(precioUVenta2);
    }
  };

  useEffect(() => {
    fijarPrecio();
  }, [cantidad, unidad]);

  const total2 = cantidad * precio;

  const [maduracion, setMad] = useState(categoria === 1 ? "semimaduro" : "N/a");

  const madf = () => {
    const valor1 = document.getElementById("mdata");
    const valor2 = valor1?.value;
    if (valor2 === "0") {
      setMad("verde");
    }
    if (valor2 === "5") {
      setMad("semimaduro");
    }
    if (valor2 === "10") {
      setMad("maduro");
    }
  };

  const anadir = () => {
    const itemId = id;
    const newCart = [...cart].map((item) => item.id);
    let resultado = newCart.includes(itemId);
    if (resultado === true) {
      alert("El producto ya se encuentra en el carrito!");
    }
    if (precio === 0) {
      alert("Selecciona precio!!!");
    }
    if (precio && precio !== 0 && resultado === false) {
      addToCartD(product, id, cantidad, unidad, precio, total2, maduracion);
      alert("El producto ha sido agregado al carrito!");
    }
    closeTest();
  };

  //----------------------------------------

  return (
    <div class="articulo">
      <div className="art-img">
        <img src={imagen} alt="Naranja" />
      </div>
      <div class="articulo-content">
        <div class="descripcion">{nombre}</div>
        <div className="articulo-c">
          <div className="articulo-subcontent">
            <div class="nombre">Precio por {unidadVenta1}</div>
            <div>
              <p class="precio-de">${precioUVenta1}</p>
            </div>
          </div>
          <div class="precio-boton">
            <button class="add-to-cart" onClick={showTestBtn}>
              Comprar
            </button>
          </div>
        </div>
      </div>

      {showTest && (
        <div className="admin-detail-main">
          <div className="div-detail-cont" ref={detail}>
            <div className="close-detail" onClick={closeTest}>
              <i class="fa-solid fa-circle-xmark"></i>
            </div>

            <div className="div-detail">
              <div className="div-detail-left">
                <div className="img-detail">
                  <img src={imagen} alt="" />
                </div>
              </div>

              <div className="div-detail-rigth">
                <div className="rigth-cont">
                  <div className="name-detail">{nombre}</div>

                  <div className="ind-pd-ppp">
                    <div
                      className="pd-ppp1"
                      style={{ marginInline: unidadVenta2 ? "10px" : 0 }}
                    >
                      <p className="pd-pp">{unidadVenta1}:</p>
                      <p className="pd-p">${precioUVenta1}</p>
                    </div>
                    {unidadVenta2 ? (
                      <div className="pd-ppp2" style={{ marginInline: "10px" }}>
                        <p className="pd-pp">{unidadVenta2}:</p>
                        <p className="pd-p">${precioUVenta2}</p>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <select
                    className="u-venta"
                    id="u-venta"
                    onChange={fijarPrecio}
                  >
                    <option value="1" id="uv-1">
                      {unidadVenta1}
                    </option>
                    <option
                      value="2"
                      id="uv-2"
                      hidden={unidadVenta2 ? false : true}
                    >
                      {unidadVenta2}
                    </option>
                  </select>
                  <div className="orden">
                    <div className="quantity">
                      <div className="cantidad">{cantidad}</div>
                      <div className="update-quantity">
                        <div
                          className="quantity-arrow"
                          onClick={() => sumar(id)}
                        >
                          <img className="arrow-up" src={up} alt="..." />
                        </div>
                        <div
                          className="quantity-arrow"
                          onClick={() => restar(id)}
                        >
                          <img className="arrow-down" src={down} alt="..." />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={cat === true ? "maduracion-a" : "maduracion-i"}
                  >
                    <div className="nivel-mad">
                      <div>
                        <p>verde</p>
                      </div>
                      <div className="mad-range">
                        <input
                          type="range"
                          list="mdata"
                          min="0"
                          max="10"
                          defaultValue={5}
                          step={5}
                          onChange={madf}
                          id="mdata"
                        />
                        <datalist>
                          <option value="0"></option>
                          <option value="5"></option>
                          <option value="10"></option>
                        </datalist>
                      </div>
                      <div>
                        <p>maduro</p>
                      </div>
                    </div>
                  </div>

                  <div className="total">
                    <div className="precio-msn">Total:</div>
                    <div className="price-detail">${total2} mxn</div>
                    <div className="mayoreo-msn">
                      A partir de {uVMayoreo} {unidadVenta1}, se tomara el
                      precio al mayoreo:
                      {" " + precioMayoreo} por {unidadVenta1}
                    </div>
                  </div>

                  <div className="detail-add">
                    <button
                      className="add-btn"
                      onClick={() =>
                        anadir(product, id, cantidad, precio, total, maduracion)
                      }
                    >
                      Añadir al carrito<i class="fa-solid fa-cart-shopping"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
