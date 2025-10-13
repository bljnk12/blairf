import { useState, useEffect, useContext, useRef } from "react";
import { CartContext } from "../components/CartContext";
import AuthContext from "../components/AuthContext";
import CartItem from "./cartitem";
import CartItemC from "../components/cartitemc";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ODirectionC from "../components/odirectionc";

const Cart = ({ close, gotoconf }) => {
  const { user } = useContext(AuthContext);

  const { cart, clearCart } = useContext(CartContext);

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  const [newTotal, setNewTotal] = useState();

  const showNewTotal = () => {
    const subtotal = cart?.map((item) => item.amount * item.precio);
    const nuevototal = subtotal.reduce((a, b) => a + b, 0);
    const subFixed = nuevototal.toFixed(2);
    setNewTotal(subFixed);
  };

  useEffect(() => {
    showNewTotal();
  }, [cart]);

  // const ordenId = useId()

  const [elementVisible, setElementVisible] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      setElementVisible(true);
    } else {
      setElementVisible(false);
    }
  }, [cart]);

  const generateId =
    Date.now().toString(35) + Math.random().toString(36).slice(2);

  const getItems = async () => {
    let carro = cart;
    let i = carro.length;
    for (let a = 0; a < i; a++) {
      const itemCart = cart[a];
      const item = {
        ordenId: generateId,
        producto: itemCart.id,
        maduracion: itemCart.maduracion,
        unidad: itemCart.unidad,
        precio: itemCart.precio,
        preciof: itemCart.precio,
        cantidad: itemCart.amount,
        cantidadf: itemCart.amount,
      };
      fetch("http://localhost:8000/blairfoodsb/item/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
    }
    console.log(cart);
  };

  const [clientes, setClientes] = useState([]);
  const [usuario, setUsuario] = useState();

  let getClientes = async () => {
    let response = await fetch(
      "http://localhost:8000/blairfoodsb/user/create/"
    );
    let data = await response.json();
    setClientes(data);
    // console.log(data)
  };

  useEffect(() => {
    getClientes();
  }, []);

  useEffect(() => {
    const usuario = clientes.find((usr) => usr.id === user?.user_id);
    setUsuario(usuario);
  }, [clientes]);

  const [direcciones, setDirecciones] = useState([]);
  const [userDirection, setUserDirection] = useState([]);

  useEffect(() => {
    getDirections();
  }, []);

  let getDirections = async () => {
    let response = await fetch(
      "http://localhost:8000/blairfoodsb/userdirection/create/"
    );
    let data = await response.json();
    setDirecciones(data);
  };

  useEffect(() => {
    const userdirection = direcciones?.filter(
      (dir) => dir.cliente === user?.user_id
    );
    setUserDirection(userdirection);
  }, [direcciones]);

  const [direccion, setDireccion] = useState(null);

  const pickDirection = (value) => {
    setDireccion(value);
    console.log(value);
  };

  const [fechaE, setFechaE] = useState("");

  const [horaE, setHoraE] = useState("");

  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  let dates = [];
  let today = new Date();

  for (let a = 0; a < 15; a++) {
    today.setDate(today.getDate() + 1 * 1);
    let diax = today.toLocaleDateString("es-MX", opciones);
    dates.push(diax);
  }

  const [available, setAvailables] = useState([]);

  useEffect(() => {
    const dias = dates.filter((i) => {
      return i.includes("martes") || i.includes("viernes");
    });
    setAvailables(dias);
  }, []);

  const diaE = fechaE + ", " + horaE;

  const fijarFecha = () => {
    if (fechaE === "") {
      alert("Selecciona un día y una hora por favor!");
    } else {
      scroll4();
    }
  };

  const [envio, setEnvio] = useState(0);
  //const [cp, setCP] = useState()

  // const fijarEnvio = () => {
  //     const costo = envios.find((item) => {
  //         return item.cp === parseInt(cp)
  //     })

  //     if (costo) {
  //         setEnvio(costo.monto)
  //     }
  // }

  // useEffect(()=>{
  //     fijarEnvio()
  // },[cp])

  const [pago, setPago] = useState("efectivo");

  const [factura, setFactura] = useState(false);

  const getOrden = () => {
    const orden = {
      ordenId: generateId,
      cliente: user?.user_id,
      clienteNombre: usuario?.username,
      productos: "ver productos",
      total: newTotal,
      diaEntrega: diaE,
      envio: envio,
      pago: pago,
      factura: factura,
      direccionEnvio: direccion,
      colocada: true,
    };
    fetch("http://localhost:8000/blairfoodsb/orden/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orden),
    });
    console.log(orden);
  };

  const [colocar, setColocar] = useState(false);

  const showColocar = () => {
    setColocar(!colocar);
  };

  const handleSubmit = () => {
    if (user === null) {
      alert("Inicie sesion para comprar!");
    }
    if (user !== null) {
      if (newTotal < 400) {
        alert("La compra debe ser mayor a $400!");
      }
      if (newTotal >= 400) {
        getOrden();
        getItems();
        clearCart();
        goHome();
        //testConnection()
        alert("Su orden se ha procesado con exito!");
      }
    }
  };

  // *Enlace fiscal* //

  const [connectionStatus, setConnectionStatus] = useState(null);
  const [error, setError] = useState(null);
  const rfc = "BFO230412NS9";

  const testConnection = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/blairfoodsb/probar-conexion/",
        { rfc }
      );
      setConnectionStatus(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  //------------------//

  // const showData = () => {
  //   console.log(direcciones)
  // }

  const step1p = document.getElementById("s1");
  const step2p = document.getElementById("s2");
  const step3p = document.getElementById("s3");
  const step4p = document.getElementById("s4");

  const targetElement1 = useRef();
  const targetElement2 = useRef();
  const targetElement3 = useRef();
  const targetElement4 = useRef();

  function scroll1() {
    const elmnt = targetElement1;
    elmnt.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
    step1p.style.color = "#f6ad55";
    step2p.style.color = "#4a5568";
    step3p.style.color = "#4a5568";
    step4p.style.color = "#4a5568";
  }

  function scroll2() {
    const elmnt = targetElement2;
    if (user === null) {
      alert("Inicie sesion para comprar!");
    }
    if (cart.length === 0) {
      alert("Tu carrito esta vacío!");
    }
    if (user !== null && cart.length > 0) {
      elmnt.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
      step1p.style.color = "#4a5568";
      step2p.style.color = "#f6ad55";
      step3p.style.color = "#4a5568";
      step4p.style.color = "#4a5568";
    }
  }

  function scroll3() {
    const elmnt = targetElement3;
    if (user === null) {
      alert("Inicie sesion para comprar!");
    }
    if (direccion === null) {
      alert("Confirme una dirección de envio por favor!");
    }
    if (user !== null && direccion !== null) {
      elmnt.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "start",
      });
      step1p.style.color = "#4a5568";
      step2p.style.color = "#4a5568";
      step3p.style.color = "#f6ad55";
      step4p.style.color = "#4a5568";
    }
  }

  function scroll4() {
    const elmnt = targetElement4;
    elmnt.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
    step1p.style.color = "#4a5568";
    step2p.style.color = "#4a5568";
    step3p.style.color = "#4a5568";
    step4p.style.color = "#f6ad55";
  }

  return (
    <div className="canasta">
      <div class="contenido-cart">
        <div className="close-cart-mobile" onClick={close}>
          <i class="fa-solid fa-arrow-left"></i>
        </div>
        <div class="barra-superior">
          <div class="flow-step">
            <i
              class="fas fa-shopping-cart"
              id="s1"
              style={{ color: "#f6ad55" }}
            ></i>
          </div>
          <div class="flow-step" style={{ color: "#4a5568" }}>
            <i class="fas fa-map-marker-alt" id="s2"></i>
          </div>
          <div class="flow-step" style={{ color: "#4a5568" }}>
            <i class="fas fa-clock" id="s3"></i>
          </div>
          <div class="flow-step" style={{ color: "#4a5568" }}>
            <i class="fa-solid fa-file" id="s4"></i>
          </div>
          <div
            className="flow-confirm"
            onClick={gotoconf}
            style={{ color: "#4a5568" }}
          >
            <i class="fas fa-check" id="s5"></i>
          </div>
        </div>

        {/* <div className="close-cart-cont">
            <div className="close-cart" onClick={closeCarrito}>
              <i class="fa-solid fa-circle-xmark"></i>
            </div>
          </div> */}

        <div className="wraper" id="myDIV">
          <div className="wraper-p">
            <div className="item-w" id="iw1" ref={targetElement1}>
              <div id="cartTitleContainer">
                <div id="cartTitle">Carrito de Compras</div>
              </div>
              {elementVisible ? (
                <div className="empty-cart-ad">
                  No hay productos en tu carrito todavía!
                </div>
              ) : (
                <>
                  <div className="carrito-tabla">
                    <div></div>
                    <div>Descripción</div>
                    <div>Unidad</div>
                    <div>Cantidad</div>
                    <div>Subtotal</div>
                  </div>
                  <div className="carrito-tabla-items">
                    {cart.map((item) => {
                      return (
                        <CartItem
                          item={item}
                          key={item.id}
                          calcular={showNewTotal}
                        />
                      );
                    })}
                  </div>
                </>
              )}
              <div id="titleBar"></div>
              <div id="totalCarritoContainer">
                <div id="totalCarrito">Total: ${newTotal}</div>
              </div>
              <div className="sp-control">
                <div className="continuar-p" onClick={scroll2}>
                  Continuar<i class="fa-solid fa-arrow-right"></i>
                </div>
              </div>
            </div>

            <div className="item-w" id="iw2" ref={targetElement2}>
              <div style={{ textAlign: "center" }}>
                <p>
                  Te pedimos revisar cuidadosamente tus datos y los detalles de
                  entrega antes de confirmar tu pedido. <br />
                  Si algo no es correcto puedes actualizarlo en el apartado{" "}
                  <b>Mi cuenta</b>
                </p>
              </div>
              <div className="billingAddress">
                <div className="ba-data">
                  <div className="label">Enviar a:</div>
                  <div>{usuario?.username}</div>
                </div>
                <div>
                  <div className="direcciones-cont">
                    {userDirection?.map((direction) => {
                      return (
                        <ODirectionC
                          direction={direction}
                          key={direction.id}
                          pickDirection={pickDirection}
                          dir={direccion}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="sp-control2">
                  <div className="regresar-p2" onClick={scroll1}>
                    <i class="fa-solid fa-arrow-left"></i>
                  </div>
                  <div className="continuar-p3" onClick={scroll3}>
                    Confirmar dirección
                  </div>
                </div>
              </div>
              {/* <div className="sp-control">
                        <div className="regresar-p" onClick={scroll1}><i class="fa-solid fa-arrow-left"></i>Regresar</div> 
                        <div className="continuar-p" onClick={scroll3}>Continuar<i class="fa-solid fa-arrow-right"></i></div> 
                      </div> */}
            </div>

            <div className="item-w" id="iw3" ref={targetElement3}>
              <div className="horario-cont">
                <div className="diaE-title">
                  Selecciona un horario de entrega
                </div>
                <div className="diaE-msn">
                  Estimado cliente, recuerda que en Blair tenemos días
                  específicos de reparto de acuerdo a la ubicación de entrega.
                  Considerando la dirección de entrega que definiste, tu pedido
                  podría ser entregado los siguientes dias:
                </div>
                <div className="dia-entrega">
                  <div className="horarios-cont">
                    <div className="horarios-cont2">
                      <div className="horarios-cont-title">Dia de entrega</div>
                      <div>
                        {available?.map((item) => {
                          return (
                            <div
                              className="horarios-select"
                              onClick={() => {
                                setFechaE(item);
                              }}
                            >
                              {item}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="horarios-cont2">
                      <div className="horarios-cont-title">Hora de entrega</div>
                      <div>
                        <div
                          className="horarios-select"
                          onClick={() => {
                            setHoraE("12:00 - 14:00");
                          }}
                        >
                          12:00 - 14:00
                        </div>
                        <div
                          className="horarios-select"
                          onClick={() => {
                            setHoraE("14:00 - 16:00");
                          }}
                        >
                          14:00 - 16:00
                        </div>
                        <div
                          className="horarios-select"
                          onClick={() => {
                            setHoraE("16:00 - 18:00");
                          }}
                        >
                          16:00 - 18:00
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="date-selected-cont">
                  <div>
                    <div className="date-selected-title">
                      Fecha y hora seleccionada:
                    </div>
                    <div className="date-selected">{diaE}</div>
                  </div>
                </div>
              </div>
              <div className="sp-control3">
                <div className="regresar-p2" onClick={scroll2}>
                  <i class="fa-solid fa-arrow-left"></i>
                </div>
                <div className="continuar-p3" onClick={fijarFecha}>
                  Confirmar horario de entrega
                </div>
              </div>
            </div>

            <div className="item-w" id="iw4" ref={targetElement4}>
              <div className="colocacion-cont">
                <div className="colocacion-left">
                  <div className="carrito-tablac-title">Productos</div>
                  <div className="carrito-tablac">
                    <div></div>
                    <div>Descripción</div>
                    <div>Unidad</div>
                    <div>Cantidad</div>
                    <div>Subtotal</div>
                  </div>
                  <div className="carrito-tablac-itemsc">
                    {cart?.map((item) => {
                      return <CartItemC item={item} key={item.id} />;
                    })}
                  </div>
                </div>
                <div className="colocacion-right">
                  <div className="cr1">
                    <div className="carrito-tablac-title">Dirección</div>
                    <div className="cr-cont">
                      {direccion === undefined ? (
                        <>Vuelve a iniciar sesión por favor!</>
                      ) : (
                        <>{direccion}</>
                      )}
                    </div>
                  </div>
                  <div className="cr2">
                    <div className="carrito-tablac-title cr-2-title">
                      Fecha y hora de entrega
                    </div>
                    <div className="cr-cont">{diaE}</div>
                  </div>
                  <div className="cr3">
                    <div className="carrito-tablac-title">Método de pago</div>
                    <div className="cr-cont">
                      <div className="cr-cont-subdiv">
                        <div>Modo</div>
                        <div>
                          <select
                            defaultValue=""
                            onChange={(e) => setPago(e.target.value)}
                          >
                            <option value="Efectivo">Efectivo</option>
                            <option value="Tarjeta">Tarjeta</option>
                          </select>
                        </div>
                      </div>
                      {/* <div className="cr-cont-subdiv">
                        <div>Factura</div>
                        <div>
                          <select
                            defaultValue=""
                            onChange={(e) => setFactura(e.target.value)}
                          >
                            <option value={true}>Si</option>
                            <option value={false}>No</option>
                          </select>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="sp-control">
                <div className="regresar-p" onClick={scroll3}>
                  <i class="fa-solid fa-arrow-left"></i>
                </div>
                <button className="colocar-btn" onClick={showColocar}>
                  Colocar pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {colocar && (
        <div className="advice-cont">
          <div className="advice-msn">
            <div>
              Estimado cliente, considera que al colocar tu pedido ya no podrás
              modificarlo, por lo que es importante que valides todos los
              detalles.
            </div>
            <button className="advice-confirm" onClick={showColocar}>
              Regresar
            </button>
            <button className="advice-cancel" onClick={handleSubmit}>
              Colocar pedido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
