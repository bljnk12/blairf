import React, { useState, useContext, useEffect, useRef } from "react";
import up from "./media/chevron-up.svg";
import down from "./media/chevron-down.svg";
import { CartContext } from "./CartContext";

const Product = ({ product }) => {
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
    pesoPieza,
  } = product;

  const [showTest, setShowTest] = useState(false);

  const showTestBtn = () => {
    setShowTest(!showTest);
  };

  function closeTest() {
    setShowTest(false);
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

  const [cat, setCat] = useState(false);

  useEffect(() => {
    if (categoria === 1) {
      setCat(true);
    }
  }, [categoria]);

  const pesonumero = parseFloat(pesoPieza);
  const cantidadPeso = pesonumero.toFixed(3);

  const [aplica, setAplica] = useState(true);

  useEffect(() => {
    if (pesoPieza === null) {
      setAplica(false);
    }
  }, [pesoPieza]);

  const [cantidad1, setCantidad1] = useState(
    pesoPieza === null ? 1 : cantidadPeso
  );
  const [cantidad2, setCantidad2] = useState(1);
  const [cantidad, setCantidad] = useState(
    pesoPieza === null ? 1 : cantidadPeso
  );
  const [pickOne, setPickOne] = useState(true);
  const [unidad, setUnidad] = useState();

  const sumar1 = (id) => {
    setPickOne(true);
    setUnidad(unidadVenta1);
    if (pesoPieza !== null) {
      let a = parseFloat(cantidad1);
      let b = parseFloat(cantidadPeso);
      let suma = a + b;
      let fixed = suma.toFixed(3);
      setCantidad1(fixed, id);
      setCantidad(fixed, id);
    }
    if (pesoPieza === null) {
      let numero = cantidad1;
      let sumar = ++numero;
      setCantidad1(sumar, id);
      setCantidad(sumar, id);
    }

    let numero = cantidad2;
    let sumar = ++numero;
    setCantidad2(sumar, id);
  };

  const restar1 = (id) => {
    setPickOne(true);
    if (pesoPieza !== null) {
      if (cantidad1 > cantidadPeso) {
        let a = parseFloat(cantidad1);
        let b = parseFloat(cantidadPeso);
        let resta = a - b;
        let fixed = resta.toFixed(3);
        setCantidad1(fixed, id);
        setCantidad(fixed, id);

        if (cantidad2 > 1) {
          let numero = cantidad2;
          let restar = --numero;
          setCantidad2(restar, id);
        }
      } else {
      }
    }
    if (pesoPieza === null) {
      if (cantidad1 > 1) {
        let numero = cantidad1;
        let restar = --numero;
        setCantidad1(restar, id);
        setCantidad(restar, id);
      }
    }
  };

  const sumar2 = (id) => {
    setPickOne(false);
    let numero = cantidad2;
    let sumar = ++numero;
    setCantidad2(sumar, id);
    setCantidad(sumar, id);

    let a = parseFloat(cantidad1);
    let b = parseFloat(cantidadPeso);
    let suma = a + b;
    let fixed = suma.toFixed(3);
    setCantidad1(fixed, id);
  };

  const restar2 = (id) => {
    setPickOne(false);
    if (cantidad2 > 1) {
      let numero = cantidad2;
      let restar = --numero;
      setCantidad2(restar, id);
      setCantidad(restar, id);

      let a = parseFloat(cantidad1);
      let b = parseFloat(cantidadPeso);
      let resta = a - b;
      let fixed = resta.toFixed(3);
      setCantidad1(fixed, id);
    } else {
    }
  };

  const [precio, setPrecio] = useState();

  const fijarPrecio = () => {
    if (pickOne === true) {
      setUnidad(unidadVenta1);
      setPrecio(precioUVenta1);
    }
    if (pickOne === false) {
      setUnidad(unidadVenta2);
      let num = precioUVenta1 * cantidadPeso;
      let num2 = num.toFixed(2);
      setPrecio(num2);
    }
  };

  useEffect(() => {
    fijarPrecio();
  }, [cantidad, unidad]);

  const totals = cantidad * precio;
  const totalf = totals.toFixed(2);

  const [maduracion, setMad] = useState("listo para rebanar");

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
      addToCartD(product, id, cantidad, unidad, precio, totalf, maduracion);
      //alert("El producto ha sido agregado al carrito!")
    }
    closeTest();
  };

  //----------------------------------------

  return (
    <div class="articulo">
      <div className="art-img">
        <img src={`http://localhost:8000/${imagen}`} alt="Naranja" />
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
        <div className="div-detail-main">
          <div className="div-detail-cont" ref={detail}>
            <div className="close-detail" onClick={closeTest}>
              <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <div className="div-detail">
              <div className="div-detail-left">
                <div>
                  <div className="img-detail">
                    <img src={`http://localhost:8000/${imagen}`} alt="" />
                  </div>
                  <div
                    className={cat === true ? "maduracion-a" : "maduracion-i"}
                  >
                    <div className="nivel-mad">
                      <div>Maduración</div>
                      <select
                        className="text-slate-600 bg-slate-200 rounded-xl w-full"
                        defaultValue=""
                        onChange={(e) => setMad(e.target.value)}
                      >
                        <option value={null}>Selecciona…</option>
                        <option value="Verde">Verde</option>
                        <option value="Semimaduro">Semimaduro</option>
                        <option value="Listo para rebanar">
                          Listo para rebanar
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="detail-msn">
                    Recuerda que el precio mostrado varía constantemente por lo
                    que podría actualizase previo a la entrega. Cualquier cambio
                    en el precio se te notificará con anticipación. Considera
                    que el peso por pieza es un aproximado, por lo que podría
                    haber variaciones entre el número de piezas y/o pesos
                    solicitados.
                  </div>
                </div>
              </div>

              <div className="div-detail-rigth">
                <div className="rigth-cont">
                  <div className="name-detail">{nombre}</div>
                  <div className="pd-pp">
                    <div className="pd-ppu">Precio:</div>
                    <div className="pd-ppp">
                      ${precioUVenta1}/{unidadVenta1}
                    </div>
                  </div>
                  <div className="orden">
                    <div className="orden-fc">
                      <div className="orden-sc-1">
                        <div className="pd-pp">
                          <div className="pd-ppu">{unidadVenta1}</div>
                        </div>
                        <div className="quantity-cont">
                          <div
                            className="quantity"
                            style={{
                              width: pesoPieza === null ? "70px" : "100px",
                            }}
                          >
                            <div
                              className="cantidad"
                              style={{
                                width: pesoPieza === null ? "40px" : "70px",
                              }}
                            >
                              {cantidad1}
                            </div>
                            <div className="update-quantity">
                              <div
                                className="quantity-arrow"
                                onClick={() => sumar1(id)}
                              >
                                <img className="arrow-up" src={up} alt="..." />
                              </div>
                              <div
                                className="quantity-arrow"
                                onClick={() => restar1(id)}
                              >
                                <img
                                  className="arrow-down"
                                  src={down}
                                  alt="..."
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {aplica && (
                        <>
                          {unidadVenta2 ? (
                            <div className="orden-sc-2" id="ordensc2">
                              <div className="pd-pp">
                                <div className="pd-ppu">{unidadVenta2}</div>
                              </div>
                              <div className="quantity-cont">
                                <div className="quantity">
                                  <div className="cantidad">{cantidad2}</div>
                                  <div className="update-quantity">
                                    <div
                                      className="quantity-arrow"
                                      onClick={() => sumar2(id)}
                                    >
                                      <img
                                        className="arrow-up"
                                        src={up}
                                        alt="..."
                                      />
                                    </div>
                                    <div
                                      className="quantity-arrow"
                                      onClick={() => restar2(id)}
                                    >
                                      <img
                                        className="arrow-down"
                                        src={down}
                                        alt="..."
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <div className="total">
                    <div className="precio-msn">Total:</div>
                    <div className="price-detail">${totalf} mxn</div>
                  </div>

                  <div className="detail-add">
                    <button
                      className="add-btn"
                      onClick={() =>
                        anadir(
                          product,
                          id,
                          cantidad,
                          precio,
                          totalf,
                          maduracion
                        )
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
