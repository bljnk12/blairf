import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "./media/fulllogo_transparent.png";
import { ProductContext } from "../components/ProductContext";
import { CartContext } from "../components/CartContext";
import Product from "./product";
import Account from "./cuenta";
import Cart from "./carrito";
import userb from "./media/user-round.svg";
import usero from "./media/user-roundo.svg";
import search from "./media/search.svg";
import searcho from "./media/searcho.svg";
import store from "./media/store.svg";
import storeo from "./media/storeo.svg";
import basket from "./media/shopping-basket.svg";
import granja from "./media/granja.png";
import Carousel from "./carousel";
import Canasta from "./canasta";

export default function HeroPage() {
  const { cart } = useContext(CartContext);

  const [dropdownRef2, setDD2] = useState(false);
  const [dropdownRef3, setDD3] = useState(false);
  const [dropdownRef4, setDD4] = useState(false);

  const [showSearch, setShowSearch] = useState(false);

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
    setAdvertainment(false);
    setShowProducts(false);
    setShowUserAccount(false);
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
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [advertainment, setAdvertainment] = useState(true);

  const selectAll = () => {
    setAdvertainment(true);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    setArticulos(products);
    closeMenu();
  };
  const selectFrutas = () => {
    setAdvertainment(false);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    const articulo = products.filter((product) => product.categoria === 1);
    setArticulos(articulo);
    closeMenu();
  };
  const selectVerduras = () => {
    setAdvertainment(false);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    const articulo = products.filter((product) => product.categoria === 2);
    setArticulos(articulo);
    closeMenu();
  };
  const selectChiles = () => {
    setAdvertainment(false);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    const articulo = products.filter((product) => product.categoria === 3);
    setArticulos(articulo);
    closeMenu();
  };
  const selectFrutos = () => {
    setAdvertainment(false);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    const articulo = products.filter((product) => product.categoria === 4);
    setArticulos(articulo);
    closeMenu();
  };
  const selectEspecias = () => {
    setAdvertainment(false);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    const articulo = products.filter((product) => product.categoria === 5);
    setArticulos(articulo);
    closeMenu();
  };
  const selectCereales = () => {
    setAdvertainment(false);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    const articulo = products.filter((product) => product.categoria === 6);
    setArticulos(articulo);
    closeMenu();
  };
  const selectHierbas = () => {
    setAdvertainment(false);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    const articulo = products.filter((product) => product.categoria === 7);
    setArticulos(articulo);
    closeMenu();
  };
  // const selectPulpas = () => {
  //   setAdvertainment(false)
  //   setShowUserAccount(false)
  //   setShowProductsF(false)
  //   setShowProducts(true)
  //   const articulo = products.filter((product)=> product.categoria === 8)
  //         setArticulos(articulo)
  //         closeMenu()
  // }
  const selectBrotes = () => {
    setAdvertainment(false);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    const articulo = products.filter((product) => product.categoria === 9);
    setArticulos(articulo);
    closeMenu();
  };
  const selectBotanas = () => {
    setAdvertainment(false);
    setShowUserAccount(false);
    setShowProductsF(false);
    setShowProducts(true);
    const articulo = products.filter((product) => product.categoria === 10);
    setArticulos(articulo);
    closeMenu();
  };

  const openAccount = () => {
    setShowUserAccount(true);
    setAdvertainment(false);
    setShowProductsF(false);
    setShowProducts(false);
    closeMenu();
  };

  const closeMenu = () => {
    setDD2(false);
  };

  const closeCanasta = () => {
    setDD3(false);
  };

  const closeMainMenu = () => {
    setDD4(false);
  };

  //   const closeSearch = () => {
  //     setShowSearch(false)
  // }

  const searchBar = () => {
    setShowSearch(!showSearch);
    setDD2(false);
    setDD3(false);
    setDD4(false);
  };

  const openMenu = () => {
    setDD2(!dropdownRef2);
    setDD3(false);
    setDD4(false);
    setShowSearch(false);
  };

  const openCanasta = () => {
    setDD3(!dropdownRef3);
    setDD2(false);
    setDD4(false);
    setShowSearch(false);
  };

  const openTopMenu = () => {
    setDD4(!dropdownRef4);
    setDD2(false);
    setDD3(false);
    setShowSearch(false);
  };

  // const dataTest = () => {
  //   alert("lala")
  // }

  return (
    <div className="app-container">
      <div className="main-container">
        <div className="app-header">
          <div className="ah-one">
            <button className="logo-btn" onClick={openTopMenu}>
              <img className="logo" height={70} width={200} src={logo} alt="" />
            </button>
          </div>
          <div className="ah-two">
            <div className="cart-spoiler" onClick={openCanasta}>
              <img src={basket} width={25} alt="" />
              <div className="cart-spoiler-items">{cart.length}</div>
            </div>
          </div>
        </div>

        {showSearch && (
          <div className="slide-menu-search">
            <div className="barra-busqueda">
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
        )}

        <div className="hero-section">
          <div
            className="hero-main"
            style={{ paddingTop: showSearch === true ? "70px" : 0 }}
          >
            {advertainment && (
              <>
                <div>
                  <div className="frase-ad-1">
                    Alimentos de calidad hasta tu puerta!
                  </div>
                  <div className="frase-ad-2"></div>
                  <div>
                    <img className="granja-ad" src={granja} alt="" />
                  </div>
                  <div className="carousel-section">
                    <Carousel
                      frutas={selectFrutas}
                      verduras={selectVerduras}
                      chiles={selectChiles}
                      frutos={selectFrutos}
                      especias={selectEspecias}
                      cereales={selectCereales}
                      hierbas={selectHierbas}
                      brotes={selectBrotes}
                      botanas={selectBotanas}
                    />
                  </div>
                </div>
              </>
            )}
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
            {showUserAccount && <Account />}
          </div>
        </div>

        <div className="app-menu">
          <button
            onClick={openMenu}
            style={{
              backgroundColor: dropdownRef2 === true ? "#f6ad55" : "black",
            }}
          >
            <img
              src={dropdownRef2 === true ? store : storeo}
              width={25}
              alt=""
            />
            <p
              className="menu-title"
              style={{ color: dropdownRef2 === true ? "black" : "#f6ad55" }}
            >
              Tienda
            </p>
          </button>
          <button
            onClick={searchBar}
            style={{
              backgroundColor: showSearch === true ? "#f6ad55" : "black",
            }}
          >
            <img
              src={showSearch === true ? search : searcho}
              width={25}
              alt=""
            />
            <p
              className="menu-title"
              style={{ color: showSearch === true ? "black" : "#f6ad55" }}
            >
              Buscar
            </p>
          </button>
          <button
            onClick={openAccount}
            style={{
              backgroundColor: showUserAccount === true ? "#f6ad55" : "black",
            }}
          >
            <img
              src={showUserAccount === true ? userb : usero}
              width={25}
              className="person-icon"
              alt=""
            />
            <p
              className="menu-title"
              style={{ color: showUserAccount === true ? "black" : "#f6ad55" }}
            >
              Cuenta
            </p>
          </button>
          <button>
            <i class="fab fa-whatsapp"></i>
            <p className="menu-title">Mensaje</p>
          </button>
        </div>

        {dropdownRef2 && (
          <div className="slide-menu">
            <div className="menu">
              <div onClick={selectVerduras}>
                <i class="fa-solid fa-carrot" style={{ color: "#ed8936" }}></i>
                Verduras
              </div>
              <div onClick={selectFrutas}>
                <i
                  class="fa-solid fa-apple-whole"
                  style={{ color: "#68d391" }}
                ></i>
                Frutas
              </div>
              <div onClick={selectChiles}>
                <i
                  class="fa-solid fa-pepper-hot"
                  style={{ color: "#e53e3e" }}
                ></i>
                Chiles secos
              </div>
              <div onClick={selectFrutos}>
                <i
                  class="fa-solid fa-seedling"
                  style={{ color: "#c05621" }}
                ></i>
                Frutos secos y semillas
              </div>
              <div onClick={selectEspecias}>
                <i class="fa-solid fa-jar" style={{ color: "#fc8181" }}></i>
                Especias
              </div>
              <div onClick={selectCereales}>
                <i
                  class="fa-solid fa-wheat-awn"
                  style={{ color: "#d69e2e" }}
                ></i>
                Cereales y leguminosas
              </div>
              <div onClick={selectHierbas}>
                <i class="fa-solid fa-spa" style={{ color: "#9f7aea" }}></i>
                Hierbas aromaticas
              </div>
              {/* <div onClick={selectPulpas}>
                <i class="fa-solid fa-lemon" style={{color:'#f687b3'}}></i><p fontSize={20}>  Pulpas</p>
            </div> */}
              <div onClick={selectBrotes}>
                <i
                  class="fa-solid fa-plant-wilt"
                  style={{ color: "#48bb78" }}
                ></i>
                Brotes y germinados
              </div>
              <div onClick={selectBotanas}>
                <i
                  class="fa-solid fa-bowl-food"
                  style={{ color: "#ecc94b" }}
                ></i>
                Botanas
              </div>
              <div onClick={selectAll}>
                <i class="fa-solid fa-utensils"></i>Todos los productos
              </div>
            </div>
          </div>
        )}

        {dropdownRef3 && (
          <div className="canasta">
            <div>
              <Canasta close={closeCanasta} />
            </div>
          </div>
        )}

        {dropdownRef4 && (
          <div className="slide-top-menu">
            <div className="close-top-menu" onClick={closeMainMenu}>
              <i class="fa-solid fa-circle-xmark"></i>
            </div>
            <div className="top-menu">
              <Link to="/loginpage" className="tm-link">
                <i class="fa-solid fa-right-to-bracket"></i>Iniciar sesión
              </Link>
              <Link to="/aboutus" className="tm-link">
                <i class="fa-solid fa-users"></i>Nosotros
              </Link>
              <Link to="/mision" className="tm-link">
                <i class="fa-solid fa-list-check"></i>Misión
              </Link>
              <Link to="/vision" className="tm-link">
                <i class="fa-solid fa-compass"></i>Visión
              </Link>
              <Link to="/contact" className="tm-link">
                <i class="fa-solid fa-envelope"></i>Mandanos un mensaje
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
