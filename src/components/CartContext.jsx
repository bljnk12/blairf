import React, { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const [itemAmount, setItemAmount] = useState(0);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.precio * currentItem.amount;
    }, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart]);

  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const addToCartD = (
    product,
    id,
    cantidad,
    unidad,
    precio,
    total,
    maduracion
  ) => {
    const cantidadf = cantidad;
    const unidadf = unidad;
    const preciof = precio;
    const totalf = total;
    const madf = maduracion;
    const newItem = {
      ...product,
      amount: cantidadf,
      unidad: unidadf,
      precio: preciof,
      total: totalf,
      maduracion: madf,
    };
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if (cartItem) {
      const newCart = [...cart].map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter((item) => {
      return item.id !== id;
    });
    setCart(newCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const restOne = (id) => {
    const cartitem = cart.find((item) => {
      return item.id === id;
    });
    if (cartitem) {
      const newcart = cart.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cartitem.amount - 1 };
        } else {
          return item;
        }
      });
      setCart(newcart);
    }
    if (cartitem.amount < 2) {
      removeFromCart(id);
    }
  };

  const addOne = (id) => {
    const cartitem = cart.find((item) => item.id === id);
    addToCart(cartitem, id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addToCartD,
        removeFromCart,
        clearCart,
        restOne,
        addOne,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
