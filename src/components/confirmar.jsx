import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./media/fulllogo_transparent.png";
import { CartContext } from "./CartContext";
import axios from "axios";
import LoginN from "./loginN";
import AuthContext from "./AuthContext";
import OrderCC from "./ordercc";
import ItemCAI from "./itemCaI";
import ItemCAA from "./itemCaa";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export default function Confirm() {
  const { user } = useContext(AuthContext);

  const usuario = parseInt(user?.user_id);

  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const cuentaBtn = () => {
    if (user === null) {
      setShowLogin(!showLogin);
    } else {
      navigate("/micuenta");
    }
  };

  function closeLogin() {
    setShowLogin(false);
  }

  const GET_ORDEN = gql`
    query GetOrdenes($cliente: ID!) {
      orden(cliente: $cliente) {
        id
        dia
        total
        factura
      }
    }
  `;

  const {
    loading: loadingO,
    error: errorO,
    data: dataO,
  } = useQuery(GET_ORDEN, {
    variables: {
      cliente: usuario,
    },
  });

  const ordenes = dataO?.orden;

  const [ordenId, setOrdenId] = useState();

  const getOrdenId = (valor) => {
    setOrdenId(valor);
  };

  const GET_ITEM = gql`
    query GetItems($orden: ID!) {
      articulo(orden: $orden) {
        id
        producto {
          nombre
        }
        unidad
        precio
        cantidad
      }
    }
  `;

  const {
    loading: loadingI,
    error: errorI,
    data: dataI,
  } = useQuery(GET_ITEM, {
    variables: {
      orden: ordenId,
    },
  });

  const items = dataI?.articulo;

  const [totalIni, setTotalIni] = useState();

  const showTotalIni = () => {
    const subtotal = items?.map((item) => item.cantidad * item.precio);
    const total = subtotal.reduce((a, b) => a + b, 0);
    setTotalIni(total);
  };

  const [totalAct, setTotalAct] = useState();

  const showTotalAct = () => {
    const subtotal = items?.map((item) => {
      return item.cantidadf * item.preciof;
    });
    const total = subtotal.reduce((a, b) => a + b, 0);
    setTotalAct(total);
  };

  useEffect(() => {
    showTotalIni();
    showTotalAct();
  }, [items]);

  const targetElement1 = useRef();
  const targetElement2 = useRef();
  const [confirmando, setConfirmando] = useState(false);

  function scroll1() {
    const elmnt = targetElement1;
    setConfirmando(false);
    elmnt.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }

  function scroll2() {
    const elmnt = targetElement2;
    setConfirmando(true);
    elmnt.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }

  const [id, setId] = useState();

  const getId = (valor) => {
    setId(valor);
    // console.log(valor);
    scroll2();
  };

  const confirm = {
    confirmada: true,
  };

  let confirmOrder = async () => {
    fetch(`http://localhost:8000/blairfoodsb/orden/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(confirm),
    });
    scroll1();
  };

  const [eliminar, setEliminar] = useState(false);

  const showEliminar = () => {
    setEliminar(!eliminar);
  };

  let deleteOrder = async () => {
    fetch(`http://localhost:8000/blairfoodsb/orden/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    showEliminar();
    scroll1();
  };

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="menu">
          <div class="logo-container">
            <div className="menu-ul">
              <img
                src={logo}
                alt="Logo de la empresa"
                width={220}
                class="logo"
              />
            </div>
          </div>
          <div class="home-container">
            <div className="menu-ul">
              <Link className="link-home" to="/">
                <i class="fas fa-home"></i>
                <p className="menu-cat">Inicio</p>
              </Link>
            </div>
          </div>
          <div class="menu-items-container">
            <div className="menu-ul">
              <Link className="link-menu" to="/verduras">
                <i class="fas fa-carrot"></i>
                <p className="menu-cat">Verduras</p>
              </Link>
              <Link className="link-menu" to="/frutas">
                <i class="fas fa-apple-alt"></i>
                <p className="menu-cat">Frutas</p>
              </Link>
              <Link className="link-menu" to="/chilessecos">
                <i class="fas fa-pepper-hot"></i>
                <p className="menu-cat">Chiles secos</p>
              </Link>
              <Link className="link-menu" to="/frutossecosysemillas">
                <i class="fas fa-seedling"></i>
                <p className="menu-cat">Frutos secos y semillas</p>
              </Link>
              <Link className="link-menu" to="/especias">
                <i class="fa-solid fa-jar"></i>
                <p className="menu-cat">Especias</p>
              </Link>
              <Link className="link-menu" to="/cerealesyleguminosas">
                <i class="fa-solid fa-wheat-awn"></i>
                <p className="menu-cat">Cereales y Leguminosas</p>
              </Link>
              <Link className="link-menu" to="/hierbasaromaticas">
                <i class="fa-brands fa-pagelines"></i>
                <p className="menu-cat">Hierbas aromáticas</p>
              </Link>
              {/* <Link className="link-menu" to="/pulpas">
                <i class="fa-regular fa-lemon"></i>
                <p className="menu-cat">Pulpas</p>
              </Link> */}
              <Link className="link-menu" to="/brotesygerminados">
                <i class="fa-solid fa-plant-wilt"></i>
                <p className="menu-cat">Brotes y germinados</p>
              </Link>
              <Link className="link-menu" to="/botanas">
                <i class="fa-solid fa-bowl-food"></i>
                <p className="menu-cat">Botanas</p>
              </Link>
              <div class="user-account-container">
                <button
                  class="profile-button"
                  id="miCuentaButton"
                  onClick={cuentaBtn}
                >
                  Mi cuenta<i class="fa-solid fa-circle-user"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="contenido-cart">
          <div class="barra-superior">
            <Link to="/carrito" class="flow-carrito">
              <i
                class="fas fa-shopping-cart"
                id="s1"
                style={{ color: "#4a5568" }}
              ></i>
              <div style={{ color: "#4a5568" }}>Carrito</div>
            </Link>
            <div class="flow-step" style={{ color: "#4a5568" }}>
              <i class="fas fa-map-marker-alt" id="s2"></i>
              <div>Dirección</div>
            </div>
            <div class="flow-step" style={{ color: "#4a5568" }}>
              <i class="fas fa-clock" id="s3"></i>
              <div>Horario</div>
            </div>
            <div class="flow-step" style={{ color: "#4a5568" }}>
              <i class="fa-solid fa-file" id="s4"></i>
              <div>Colocación</div>
            </div>
            <Link className="flow-confirm" to="/confirmar">
              <i
                class="fas fa-check"
                id="s5"
                style={{ color: confirmando === true ? "#FFA500" : "#4a5568" }}
              ></i>
              <div style={{ color: "#4a5568" }}>Confirmación</div>
            </Link>
          </div>

          {/* <div className="close-cart-cont">
            <div className="close-cart" onClick={closeCarrito}>
              <i class="fa-solid fa-circle-xmark"></i>
            </div>
          </div> */}

          <div className="wraper" id="myDIV">
            <div className="wraper-p">
              <div className="item-w" id="iw5" ref={targetElement1}>
                <div className="dashboard">
                  <Link to="/carrito" className="carrito-link-dash">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <div className="cld1">Mi Carrito</div>
                    <div className="cld2">({cart?.length} articulos)</div>
                  </Link>
                  <div className="orders-dashboard">
                    {userorder?.length === 0 ? (
                      <div className="no-orders-ad">
                        No tienes órdenes revisadas todavía!
                      </div>
                    ) : (
                      <>
                        {ordenes?.map((orden) => {
                          return (
                            <OrderCC
                              orden={orden}
                              key={orden.id}
                              getOrden={getOrdenId}
                              getid={getId}
                            />
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="item-w" id="iw6" ref={targetElement2}>
                <div className="order-conf-cont">
                  <div className="order-i">
                    <div className="order-ia-title">Orden inicial</div>
                    <div className="order-i-table-title">
                      <div className="oit-cai-1"></div>
                      <div className="oit-cai-2">Producto</div>
                      <div className="oit-cai-3">Cantidad</div>
                      <div className="oit-cai-4">Precio</div>
                      <div className="oit-cai-5">Subtotal</div>
                    </div>
                    <div className="order-ia-table-cont">
                      {orderitems?.map((item) => {
                        return <ItemCAI item={item} key={item.id} />;
                      })}
                    </div>
                    <div className="order-ia-total">
                      Total inicial: ${totalIni}
                    </div>
                  </div>
                  <div className="order-act">
                    <div className="order-ia-title">Orden Actualizada</div>
                    <div className="order-act-table-title">
                      <div className="oit-caa-1">Cantidad</div>
                      <div className="oit-caa-2">Precio</div>
                      <div className="oit-caa-3">Subtotal</div>
                      <div className="oit-caa-4">Eliminar</div>
                    </div>
                    <div className="order-ia-table-cont">
                      {orderitems?.map((item) => {
                        return <ItemCAA item={item} key={item.id} />;
                      })}
                    </div>
                    <div className="order-ia-total">
                      Total actualizado: ${totalAct}
                    </div>
                  </div>
                </div>
                <div className="confirm-controls">
                  <button className="colocar-btn" onClick={scroll1}>
                    Regresar
                  </button>
                  <button className="colocar-btn" onClick={showEliminar}>
                    Cancelar orden
                  </button>
                  <button className="colocar-btn" onClick={confirmOrder}>
                    Confirmar orden
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showLogin && <LoginN close={closeLogin} />}
        {eliminar && (
          <div className="advice-cont">
            <div className="advice-del-msn">
              <div>Estas seguro que deseas eliminar la orden?</div>
              <button className="advice-del-confirm" onClick={deleteOrder}>
                Si
              </button>
              <button className="advice-del-cancel" onClick={showEliminar}>
                No
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
