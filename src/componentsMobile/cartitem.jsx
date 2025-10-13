import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/CartContext";
import xcircle from "./media/xcircle.svg";

const CartItem = ({ item, calcular }) => {
  const { removeFromCart } = useContext(CartContext);

  const { id, nombre, unidad, amount, precio, pesoPieza } = item;

  const [newAmount, setNewAmount] = useState(amount);

  const restar = () => {
    if (unidad !== "Pieza") {
      if (newAmount > parseFloat(pesoPieza)) {
        let a = parseFloat(newAmount);
        let b = parseFloat(pesoPieza);
        let resta = a - b;
        let fixed = resta.toFixed(3);
        setNewAmount(fixed);
      }
    }
    if (unidad === "Pieza" || pesoPieza === null) {
      if (newAmount > 1) {
        let numero = parseInt(newAmount);
        let restar = --numero;
        setNewAmount(restar);
      }
    }
  };

  const agregar = () => {
    if (unidad !== "Pieza") {
      let a = parseFloat(newAmount);
      let b = parseFloat(pesoPieza);
      let suma = a + b;
      let fixed = suma.toFixed(3);
      setNewAmount(fixed);
    }
    if (unidad === "Pieza" || pesoPieza === null) {
      let numero = parseInt(newAmount);
      let sumar = ++numero;
      setNewAmount(sumar);
    }
  };

  useEffect(() => {
    item.amount = newAmount;
    calcular();
  }, [newAmount]);

  const subTotal = newAmount * precio;
  const subTotalN = subTotal.toFixed(2);

  const showData = () => {
    console.log(amount);
  };

  return (
    <div className="carrito-tabla-item">
      <div>
        <img
          className="drop-articulo"
          src={xcircle}
          width={20}
          height={20}
          alt="..."
          onClick={() => removeFromCart(id)}
        />
      </div>
      <div>{nombre}</div>
      <div>{unidad}</div>
      <div className="amount-item">
        <div className="amount-change" onClick={restar}>
          <i class="fa-solid fa-circle-minus"></i>
        </div>
        <div className="new-quantity" onClick={showData}>
          {newAmount}
        </div>
        <div className="amount-change" onClick={agregar}>
          <i class="fa-solid fa-circle-plus"></i>
        </div>
      </div>
      <div>${subTotalN}</div>
    </div>
  );
};

export default CartItem;
