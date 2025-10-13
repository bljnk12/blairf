import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "./media/fulllogo_transparent.png";
import { ProductContext } from "./ProductContext";
import Product from "./product";
import { CartContext } from "./CartContext";
import LoginN from "./loginN";
import AuthContext from "./AuthContext";
import HotPics from "./hotpics";
import * as bootstrap from "bootstrap";

export default function Stars() {
  const { user } = useContext(AuthContext);

  const { products } = useContext(ProductContext);

  const { cart } = useContext(CartContext);

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

  const [itemS, setItemS] = useState(null);

  const handleChange = (value) => {
    setItemS((item) => ({ ...item, nombre: value }));
  };

  const [articulosF, setArticulosF] = useState([]);

  const buscar = () => {
    const product1 = products.filter((i) => {
      const value1 = i.nombre.toLowerCase();
      const value2 = itemS.nombre.toLowerCase();
      return value1.includes(value2);
    });

    if (product1.length === 0) {
      alert("No hay resultados para su busqueda!");
    }
    if (itemS.nombre.length === 0) {
      setArticulosF([]);
    } else {
      setArticulosF(product1);
    }
  };

  const [showLogin, setShowLogin] = useState(false);

  function closeLogin() {
    setShowLogin(false);
  }

  const navigate = useNavigate();

  const cuentaBtn = () => {
    if (user === null) {
      setShowLogin(!showLogin);
    } else {
      navigate("/micuenta");
    }
  };

  const popoverTriggerList = document.querySelectorAll(
    '[data-bs-toggle="popover"]'
  );
  const popoverList = [...popoverTriggerList].map(
    (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
  );

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="menu">
          <div class="logo-container">
            <div className="menu-ul">
              <img
                src={logo}
                alt="Logo de la empresa"
                width={220}
                class="logo"
              />
            </div>
          </div>
          <div class="home-container">
            <div className="menu-ul">
              <Link className="link-home" to="/">
                <i class="fas fa-home"></i>
                <p className="menu-cat">Inicio</p>
              </Link>
            </div>
          </div>
          <div class="menu-items-container">
            <div className="menu-ul">
              <Link className="link-menu" to="/verduras">
                <i class="fas fa-carrot"></i>
                <p className="menu-cat">Verduras</p>
              </Link>
              <Link className="link-menu" to="/frutas">
                <i class="fas fa-apple-alt"></i>
                <p className="menu-cat">Frutas</p>
              </Link>
              <Link className="link-menu" to="/chilessecos">
                <i class="fas fa-pepper-hot"></i>
                <p className="menu-cat">Chiles secos</p>
              </Link>
              <Link className="link-menu" to="/frutossecosysemillas">
                <i class="fas fa-seedling"></i>
                <p className="menu-cat">Frutos secos y semillas</p>
              </Link>
              <Link className="link-menu" to="/especias">
                <i class="fa-solid fa-jar"></i>
                <p className="menu-cat">Especias</p>
              </Link>
              <Link className="link-menu" to="/cerealesyleguminosas">
                <i class="fa-solid fa-wheat-awn"></i>
                <p className="menu-cat">Cereales y Leguminosas</p>
              </Link>
              <Link className="link-menu" to="/hierbasaromaticas">
                <i class="fa-brands fa-pagelines"></i>
                <p className="menu-cat">Hierbas aromáticas</p>
              </Link>
              <Link className="link-menu" to="/pulpas">
                <i class="fa-regular fa-lemon"></i>
                <p className="menu-cat">Pulpas</p>
              </Link>
              <Link className="link-menu" to="/brotesygerminados">
                <i class="fa-solid fa-plant-wilt"></i>
                <p className="menu-cat">Brotes y germinados</p>
              </Link>
              <Link className="link-menu" to="/botanas">
                <i class="fa-solid fa-bowl-food"></i>
                <p className="menu-cat">Botanas</p>
              </Link>
              <div class="user-account-container">
                <button
                  class="profile-button"
                  id="miCuentaButton"
                  onClick={cuentaBtn}
                >
                  Mi cuenta<i class="fa-solid fa-circle-user"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="contenido">
          <div class="barra-superior">
            <div class="search-container">
              <input
                type="text"
                class="search-input"
                placeholder="Buscar . . ."
                onChange={(e) => {
                  handleChange(e.target.value);
                }}
                value={itemS?.nombre}
                onKeyUp={buscar}
              />
              <button class="search-button" onClick={buscar}>
                <i class="fas fa-search"></i>
              </button>
            </div>
            <div class="menus-superior">
              <Link to="/estrellas" className="ms1c" id="stars-selected">
                <i class="fas fa-star"></i>
                <p>Nuestras Estrellas</p>
              </Link>
              <Link to="/conocenos" className="ms2c">
                <i class="fas fa-users"></i>
                <p>Conocenos</p>
              </Link>
            </div>
            <Link to="/confirmar" class="carrito">
              <i class="fas fa-shopping-cart"></i>
              <span class="cuenta-acumulada">${newTotal}</span>
            </Link>
            <div class="whatsapp">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-toggle="popover"
                data-bs-placement="bottom"
                data-bs-title="Mandanos un mensaje!"
                data-bs-content="44200000"
              >
                <i class="fab fa-whatsapp"></i>
              </button>
            </div>
          </div>
          <div className="contenido-container">
            <div className="title-container"></div>
            <div className="zona-articulos">
              {articulosF.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
              <br />

              <HotPics />
            </div>
          </div>
        </div>
      </div>
      {showLogin && <LoginN close={closeLogin} />}
    </div>
  );
}
