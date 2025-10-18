import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../components/CartContext";
import axios from "axios";
import AuthContext from "../components/AuthContext";
import OrderCC from "./ordercc";
import ItemCAI from "./itemCaI";
import ItemCAA from "./itemCaa";
import { gql } from "@apollo/client";
import { useQuery, useMutation } from "@apollo/client/react";

export default function Confirm({ close, gotocart }) {
  const { user } = useContext(AuthContext);

  const usuarioId = parseInt(user?.user_id);

  const { cart } = useContext(CartContext);

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
      cliente: usuarioId,
    },
  });

  const ordenes = dataO?.orden;

  const [ordenesF, setOrdenesF] = useState([]);

  useEffect(() => {
    const ordenesFiltradas = ordenes?.filter(
      (orden) => orden.confirmada === false
    );
    setOrdenesF(ordenesFiltradas);
  }, [ordenes]);

  const [id, setId] = useState();

  const GET_ARTICULO = gql`
    query GetItems($orden: ID!) {
      articulo(orden: $orden) {
        id
        producto {
          imagen
          nombre
        }
        unidad
        precio
        cantidad
        preciof
        cantidadf
      }
    }
  `;

  const {
    loading: loadingI,
    error: errorI,
    data: dataI,
  } = useQuery(GET_ARTICULO, {
    variables: {
      orden: id,
    },
  });

  const items = dataI?.articulo;

  const [totalIni, setTotalIni] = useState(0);

  const showTotalIni = () => {
    const subtotal = items?.map((item) => {
      return parseFloat(item.cantidad) * parseFloat(item.precio);
    });
    const total = subtotal?.reduce((a, b) => a + b, 0);
    setTotalIni(total);
  };

  const [totalAct, setTotalAct] = useState();

  const showTotalAct = () => {
    const subtotal = items?.map((item) => {
      return parseFloat(item.cantidadf) * parseFloat(item.preciof);
    });
    const total = subtotal?.reduce((a, b) => a + b, 0);
    setTotalAct(total);
  };

  useEffect(() => {
    showTotalIni();
    showTotalAct();
  }, [items]);

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

  const getId = (valor) => {
    setId(valor);
    // console.log(valor);
    scroll2();
  };

  const UPDATE_ORDEN = gql`
    mutation updateOrden($id: ID!, $confirmada: Boolean) {
      updateOrden(id: $id, confirmada: $confirmada) {
        orden {
          id
          confirmada
        }
      }
    }
  `;

  const [updateOrden, { data: dataUO, loading: loadingUO, error: errorUO }] =
    useMutation(UPDATE_ORDEN, {
      refetchQueries: [
        {
          query: GET_ORDEN,
          variables: { cliente: usuarioId },
        },
        "GetOrdenes",
      ],
    });

  const handleSubmitUpdateOrden = async () => {
    if (user) {
      try {
        const result = await updateOrden({
          variables: {
            id: parseInt(id),
            confirmada: true,
          },
        });
        scroll1();
      } catch (e) {
        // The 400 Bad Request error will be caught here!
        //console.error(e);
      }
    } else {
      alert("Inicia sesión por favor!");
    }
  };

  const [eliminar, setEliminar] = useState(false);

  const showEliminar = () => {
    setEliminar(!eliminar);
  };

  const DELETE_ORDEN = gql`
    mutation EliminarOrden($id: ID!) {
      deleteOrden(id: $id) {
        message
      }
    }
  `;

  const [deleteOrden, { data: dataDO, loading: loadingDO, error: errorDO }] =
    useMutation(DELETE_ORDEN, {
      refetchQueries: [
        {
          query: GET_ORDEN,
          variables: { cliente: usuarioId },
        },
        "GetOrdenes",
      ],
    });

  const handleSubmitDeleteOrden = async () => {
    if (user) {
      try {
        const result = await deleteOrden({
          variables: {
            id: parseInt(id),
          },
        });
        //console.log(result);
        showEliminar();
        scroll1();
      } catch (e) {
        console.error(e);
      }
    } else {
      alert("Inicia sesión por favor!");
    }
  };

  const showData = () => {
    console.log(items);
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
                  {ordenes?.length === 0 ? (
                    <div className="no-orders-ad">
                      No tienes órdenes revisadas todavía!
                    </div>
                  ) : (
                    <>
                      {ordenesF?.map((orden) => {
                        return (
                          <OrderCC orden={orden} key={orden.id} getid={getId} />
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
                    {items?.map((item) => {
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
                    {items?.map((item) => {
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
