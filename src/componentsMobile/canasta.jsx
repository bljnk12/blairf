import Cart from "./carrito";
import Confirm from "./confirmar";
import { useState } from "react";

export default function Canasta({ close }) {
  const [confirm, setConfitm] = useState(true);
  const [carrito, setCarrito] = useState(false);

  const goCarrito = () => {
    setConfitm(false);
    setCarrito(true);
  };

  const goConfirm = () => {
    setConfitm(true);
    setCarrito(false);
  };

  const CloseCanasta = () => {
    close();
  };

  return (
    <div>
      {confirm && <Confirm gotocart={goCarrito} close={CloseCanasta} />}
      {carrito && <Cart gotoconf={goConfirm} close={CloseCanasta} />}
    </div>
  );
}
