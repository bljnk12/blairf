import React from "react";

const CartItemC = ({ item }) => {
  const { nombre, unidad, amount, imagen, precio } = item;

  const subTotal = amount * precio;
  const subFixed = subTotal.toFixed(2);

  return (
    <div className="carrito-tabla-itemc">
      <div>
        <img
          className="ci-image"
          width={50}
          height={50}
          src={`http://localhost:8000/${imagen}`}
          alt=""
        />
      </div>
      <div>{nombre}</div>
      <div>{unidad}</div>
      <div>{amount}</div>
      <div>${subFixed}</div>
    </div>
  );
};

export default CartItemC;
