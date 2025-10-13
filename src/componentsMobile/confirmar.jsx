import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import OrderCC from "./ordercc";
import ItemCAI from "./itemCaI";
import ItemCAA from "./itemCaa";

export default function Confirm({ close, gotocart }) {
  const { user } = useContext(AuthContext);

  const { cart } = useContext(CartContext);

  const [ordenes, setOrdenes] = useState([]);
  const [userorder, setUserOrder] = useState([]);

  useEffect(() => {
    const Ordenes = () => {
      getOrdenes();
    };
    Ordenes();
  }, []);

  let getOrdenes = async () => {
    let response = await fetch(
      "http://localhost:8000/blairfoodsb/orden/create/"
    );
    let data = await response.json();
    setOrdenes(data);
    // console.log(data)
  };

  useEffect(() => {
    const userorder = ordenes.filter(
      (ord) => ord.cliente === user?.user_id && ord.revisada === true
    );
    setUserOrder(userorder);
  }, [ordenes]);

  const [ordenId, setOrdenId] = useState();
  const [items, setItems] = useState([]);
  const [orderitems, setOrderItems] = useState([]);

  const getOrdenId = (valor) => {
    setOrdenId(valor);
  };

  useEffect(() => {
    const Items = () => {
      getItems();
    };
    Items();
  }, []);

  let getItems = async () => {
    let response = await fetch(
      "http://localhost:8000/blairfoodsb/item/create/"
    );
    let data = await response.json();
    setItems(data);
    // console.log(data)
  };

  useEffect(() => {
    const itemsDelUsuario = items?.filter((item) => item.ordenId === ordenId);
    setOrderItems(itemsDelUsuario);
  }, [ordenId]);

  const [totalIni, setTotalIni] = useState();

  const showTotalIni = () => {
    const subtotal = orderitems?.map((item) => item.cantidad * item.precio);
    const total = subtotal.reduce((a, b) => a + b, 0);
    setTotalIni(total);
  };

  const [totalAct, setTotalAct] = useState();

  const showTotalAct = () => {
    const subtotal = orderitems?.map((item) => {
      return item.cantidadf * item.preciof;
    });
    const total = subtotal.reduce((a, b) => a + b, 0);
    setTotalAct(total);
  };

  useEffect(() => {
    showTotalIni();
    showTotalAct();
  }, [orderitems]);

  const targetElement1 = useRef();
  const targetElement2 = useRef();

  function scroll1() {
    const elmnt = targetElement1;
    elmnt.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }

  function scroll2() {
    const elmnt = targetElement2;
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
    <div className="confirm-movil">
      <div class="contenido-cart">
        <div className="close-cart-mobile" onClick={close}>
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div className="wraper" id="myDIV">
          <div className="wraper-p">
            <div className="item-w" id="iw5" ref={targetElement1}>
              <div className="dashboard">
                <div className="carrito-link-dash" onClick={gotocart}>
                  <i class="fa-solid fa-cart-shopping"></i>
                  <div className="cld1">Mi Carrito</div>
                  <div className="cld2">({cart?.length} articulos)</div>
                </div>
                <div className="orders-dashboard">
                  {userorder?.length === 0 ? (
                    <div className="no-orders-ad">
                      No tienes órdenes revisadas todavía!
                    </div>
                  ) : (
                    <>
                      {userorder?.map((orden) => {
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
      </div>
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
  );
}
