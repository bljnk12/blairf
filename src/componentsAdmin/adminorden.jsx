import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../components/ProductContext";
import { CartContext } from "../components/CartContext";
import Product from "./product";
import Cart from "./carrito";
import basket from "./media/shopping-basket-w.png";

export default function OrdenAdmin() {
  const { cart } = useContext(CartContext);

  const [dropdownRef3, setDD3] = useState(false);

  const { products } = useContext(ProductContext);

  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    setArticulos(products);
  }, [products]);

  const [itemS, setItemS] = useState(null);

  const handleChange = (value) => {
    setItemS((item) => ({ ...item, nombre: value }));
  };

  const [articulosF, setArticulosF] = useState([]);

  const buscar = () => {
    setShowProductsF(true);
    setShowProducts(false);

    const product1 = products?.filter((i) => {
      const value1 = i.nombre.toLowerCase();
      const value2 = itemS.nombre.toLowerCase();
      return value1.includes(value2);
    });

    if (product1.length === 0) {
      alert("No hay resultados para su busqueda!");
    }
    if (itemS.nombre.length === 0) {
      setArticulosF([]);
      setShowProducts(true);
    } else {
      setArticulosF(product1);
    }
  };

  const [showProducts, setShowProducts] = useState(true);
  const [showProductsF, setShowProductsF] = useState(false);

  const showCarrito = () => {
    setDD3(!dropdownRef3);
  };

  const closeCarrito = () => {
    setDD3(false);
  };

  return (
    <div className="admin-orden-app">
      <div className="admin-header">
        <div className="admin-cart" onClick={showCarrito}>
          <img src={basket} width={25} alt="" />
          <div className="admin-cart-spoiler-items">{cart.length}</div>
        </div>
        <div className="admin-barra-busqueda">
          <input
            placeholder="buscar..."
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            value={itemS?.nombre}
            onKeyUp={buscar}
          />
        </div>
      </div>

      <div className="hero-admin">
        {showProductsF && (
          <>
            {articulosF.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </>
        )}
        {showProducts && (
          <>
            {articulos?.map((product) => {
              return <Product product={product} key={product.id} />;
            })}
          </>
        )}
      </div>

      {dropdownRef3 && (
        <div className="admin-slide-carrito">
          <div>
            <Cart close={closeCarrito} />
          </div>
        </div>
      )}
    </div>
  );
}
