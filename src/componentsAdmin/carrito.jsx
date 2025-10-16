import { useState, useEffect, useContext, useRef } from "react";
import { CartContext } from "../components/CartContext";
import CartItem from "./cartitem";

const Cart = ({ close }) => {
  const { cart, total, clearCart } = useContext(CartContext);

  const [elementVisible, setElementVisible] = useState(false);

  useEffect(() => {
    if (cart.length === 0) {
      setElementVisible(true);
    } else {
      setElementVisible(false);
    }
  }, [cart]);

  const [fechaE, setFechaE] = useState("");

  function disablePastDates() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + "-" + mm + "-" + dd;
    document.getElementById("deliverydaym").setAttribute("min", today);
  }

  let handleChangeDate = (value) => {
    setFechaE(value);
  };

  const [horaE, setHoraE] = useState("mañana");

  const diaE = fechaE + " " + horaE;

  const mañana = () => {
    setHoraE("mañana");
  };

  const tarde = () => {
    setHoraE("tarde");
  };

  const [factura, setFactura] = useState(false);

  const solFactura = () => {
    setFactura(!factura);
  };

  const [pago, setPago] = useState("efectivo");

  const modEfectivo = () => {
    setPago("efectivo");
  };

  const modTarjeta = () => {
    setPago("tarjeta");
  };

  const [envio, setEnvio] = useState(0);

  const [direccion, setDireccion] = useState("");

  const handleSubmit = async () => {
    if (total < 400) {
      alert("La compra debe ser mayor a $400!");
      return; // Stop execution
    }

    const orderPayload = {
      cliente: user?.user_id,
      clienteNombre: usuario?.username,
      productos: "ver productos",
      total: total,
      diaEntrega: diaE,
      envio: envio,
      pago: pago,
      factura: factura,
      direccionEnvio: direccion,

      items: cart.map((itemCart) => ({
        producto: itemCart.id,
        maduracion: itemCart.maduracion,
        unidad: itemCart.unidad,
        precio: itemCart.precio,
        preciof: itemCart.precio,
        cantidad: itemCart.amount,
        cantidadf: itemCart.amount,
      })),
    };
    console.log("Order:", orderPayload);
    try {
      const response = await fetch(
        "http://localhost:8000/blairfoodsb/orden/place-order/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderPayload),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        console.error("DRF Validation Error:", errorData);
        return;
      }
      alert("Pedido colocado con éxito!");
      // 3. Success actions
      clearCart();
      goHome();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Hubo un error al colocar el pedido. Intenta de nuevo.");
    }
  };

  const canasta = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (canasta.current && !canasta.current.contains(event.target)) {
        close();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [canasta]);

  return (
    <div className="admin-carrito" ref={canasta}>
      {/* <div className='close-cart-mobile' onClick={close}>
              <i class="fa-solid fa-circle-xmark"></i>
            </div> */}

      <div className="admin-carrito-cont">
        <div className="admin-carrito-items">
          {elementVisible ? <div>No hay productos en el carrito!</div> : null}
          {cart.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })}
        </div>

        <div className="admin-carrito-setup">
          <div className="admin-carrito-total">
            <div className="admin-carrito-total-total">Total: ${total}</div>
          </div>

          <div className="admin-carrito-envio">
            <div className="ce-title">Direccion de envio:</div>
            <input
              className="admin-direccion"
              onChange={(e) => {
                setDireccion(e.target.value);
              }}
            />
          </div>

          <div className="admin-carrito-diae">
            <div>Fecha de entrega: </div>
            <input
              className="admin-deliveryday"
              id="deliverydaym"
              type="date"
              onChange={(e) => {
                handleChangeDate(e.target.value);
              }}
              onFocus={disablePastDates}
            />
          </div>

          <div className="admin-carrito-horario">
            <div>Horario de entrega:</div>
            <div className="admin-opciones-hora">
              <button
                className="opcion-hora-boton"
                onClick={mañana}
                style={{
                  backgroundColor: horaE === "mañana" ? "#feebc8" : "white",
                  border: horaE === "mañana" ? "none" : "1px solid grey",
                }}
              >
                <i class="fa-solid fa-sun" /> Mañana
              </button>
              <button
                className="opcion-hora-boton"
                onClick={tarde}
                style={{
                  backgroundColor: horaE === "tarde" ? "#feebc8" : "white",
                  border: horaE === "tarde" ? "none" : "1px solid grey",
                }}
              >
                <i class="fa-solid fa-moon" /> Tarde
              </button>
            </div>
          </div>

          <div>
            <div className="admin-carrito-factura">
              <div>Factura:</div>
              <button
                className="admin-factura-boton"
                onClick={solFactura}
                style={{
                  backgroundColor: factura === true ? "black" : "#e2e8f0",
                  color: "white",
                }}
              >
                <i class="fa-solid fa-check" />
              </button>
            </div>
            <div className="admin-carrito-pago">
              <div>Pago:</div>
              <div className="opciones-pago-btn">
                <button
                  className="admin-opcion-pago-boton"
                  onClick={modEfectivo}
                  style={{
                    backgroundColor: pago === "efectivo" ? "black" : "#e2e8f0",
                    color: "white",
                  }}
                >
                  <i class="fa-solid fa-money-bill" /> Efectivo
                </button>
                <button
                  className="admin-opcion-pago-boton"
                  onClick={modTarjeta}
                  style={{
                    backgroundColor: pago === "tarjeta" ? "black" : "#e2e8f0",
                    color: "white",
                  }}
                >
                  <i class="fa-solid fa-credit-card" /> Tarjeta
                </button>
              </div>
            </div>
          </div>

          <div className="admin-carrito-btn">
            <button className="admin-carrito-boton" onClick={handleSubmit}>
              Confirmar <i class="fa-solid fa-bag-shopping" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
