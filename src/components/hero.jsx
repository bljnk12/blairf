import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./media/fulllogo_transparent.png";
import { ProductContext } from "./ProductContext";
import Product from "./product";
import { CartContext } from "./CartContext";
import LoginN from "./loginN";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import * as bootstrap from "bootstrap";
import frutasimg from "./media/frutasb.png";
import verdurasimg from "./media/verduras.png";
import chilesimg from "./media/chilessecos.jpg";
import frutosimg from "./media/semillas.png";
import especiasimg from "./media/especias.png";
import cerealesimg from "./media/cereales.png";

export default function Hero() {
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

  const box = document.getElementById("hero-box");

  const [itemS, setItemS] = useState(null);

  const handleChange = (value) => {
    setItemS((item) => ({ ...item, nombre: value }));
  };

  const [articuloF, setArticulosF] = useState([]);

  const [noResults, setNoResults] = useState(false);

  const buscar = () => {
    box.style.display = "none";
    const product1 = products.filter((i) => {
      const value1 = i.nombre.toLowerCase();
      const value2 = itemS.nombre.toLowerCase();
      return value1.includes(value2);
    });
    if (product1.length === 0) {
      setNoResults(true);
    }
    if (itemS.nombre.length === 0) {
      setArticulosF([]);
      setNoResults(false);
      box.style.display = "block";
    } else {
      setArticulosF(product1);
    }
  };

  const [showLogin, setShowLogin] = useState(false);

  function closeLogin() {
    setShowLogin(false);
  }

  const { user } = useContext(AuthContext);

  //   const [userL, setUserL] = useState()

  //   useEffect(() => {
  //     function getuser() {
  //         const usuario = localStorage.getItem('usuario');
  //         setUserL(usuario);
  //     }
  //      getuser()
  //   },[userL]);

  const showUser = () => {
    console.log(user);
  };

  const navigate = useNavigate();

  const cuentaBtn = () => {
    if (user === null) {
      showUser();
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

  // const showData = () => {
  //     console.log(products[0]?.nombre)
  // }

  return (
    <div className="hero">
      <div className="hero-container">
        <div className="menu">
          <div class="logo-container">
            <div className="menu-ul">
              <img src={logo} alt="Logo de la empresa" class="logo" />
            </div>
          </div>
          <div class="home-container">
            <div className="menu-ul">
              <Link className="link-home" to="/" id="home-selected">
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
              {/* <Link className="link-menu" to="/pulpas"><i class="fa-regular fa-lemon"></i><p className="menu-cat">Pulpas</p></Link> */}
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
              {/* <Link to="/estrellas" className='ms1c'><i class="fas fa-star"></i><p>Nuestras Estrellas</p></Link> */}
              <Link to="/conocenos" className="ms2c">
                <i class="fas fa-users"></i>
                <p>Conócenos</p>
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
              <div className="hero-box" id="hero-box">
                <h3>Llevando alimentos de calidad hasta tu puerta</h3>
                <div class="row row-cols-1 row-cols-md-3 g-4">
                  <div class="col">
                    <Link className="hero-box-link" to="/verduras">
                      <div class="card h-100">
                        <img
                          src={verdurasimg}
                          height={150}
                          class="card-img-top-1"
                          alt="..."
                        />
                        <div class="card-body">
                          <h5 class="card-title">Verduras</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col">
                    <Link className="hero-box-link" to="/frutas">
                      <div class="card h-100">
                        <img
                          src={frutasimg}
                          height={150}
                          class="card-img-top-2"
                          alt="..."
                        />
                        <div class="card-body">
                          <h5 class="card-title">Frutas</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col">
                    <Link className="hero-box-link" to="/chilessecos">
                      <div class="card h-100">
                        <img
                          src={chilesimg}
                          height={150}
                          class="card-img-top-3"
                          alt="..."
                        />
                        <div class="card-body">
                          <h5 class="card-title">Chiles secos</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col">
                    <Link className="hero-box-link" to="/frutossecosysemillas">
                      <div class="card h-100">
                        <img
                          src={frutosimg}
                          height={150}
                          class="card-img-top-4"
                          alt="..."
                        />
                        <div class="card-body">
                          <h5 class="card-title">Frutos secos y semillas</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col">
                    <Link className="hero-box-link" to="/especias">
                      <div class="card h-100">
                        <img
                          src={especiasimg}
                          height={150}
                          class="card-img-top-5"
                          alt="..."
                        />
                        <div class="card-body">
                          <h5 class="card-title">Especias</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div class="col">
                    <Link className="hero-box-link" to="/cerealesyleguminosas">
                      <div class="card h-100">
                        <img
                          src={cerealesimg}
                          height={150}
                          class="card-img-top-6"
                          alt="..."
                        />
                        <div class="card-body">
                          <h5 class="card-title">Cereales</h5>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {noResults && (
                <div className="no-results-adv">
                  No hay resultados para tu busqueda!
                </div>
              )}
              {articuloF.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
      {showLogin && <LoginN close={closeLogin} />}
    </div>
  );
}
