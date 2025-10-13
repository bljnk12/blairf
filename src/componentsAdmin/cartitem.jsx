import { useContext } from "react";
import { CartContext } from "../components/CartContext";
import xdelete from "./media/x.png";

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  const { id, nombre, amount, imagen, unidad, precio } = item;

  // const url = 'https://blairfoods01-production.up.railway.app'+imagen

  function remove() {
    removeFromCart(id);
  }

  return (
    <div className="cartitem">
      <div className="cartitem-img">
        <img src={imagen} width={50} alt="" />
      </div>
      <div className="cartitem-detail">
        <div className="cartitem-name">{nombre}</div>
        <div className="cartitem-unidad">
          {amount} {unidad}
        </div>
        <div className="cartitem-precio">${precio}</div>
      </div>
      <button className="cartitem-r-boton" onClick={remove}>
        <img src={xdelete} width={20} alt="" />
      </button>
    </div>
  );
};

export default CartItem;
