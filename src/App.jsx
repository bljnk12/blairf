import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import Hero from "./components/hero";
import Frutas from "./components/frutas";
import Verduras from "./components/verduras";
import Semillas from "./components/semillas";
import Especias from "./components/especias";
import Cereales from "./components/cereales";
import Chiles from "./components/chiles";
import CartN from "./components/carritoN";
import Register from "./components/registrar";
import Account from "./components/cuenta";
import OrderP from "./components/orderp";
import Hierbas from "./components/hierbas";
import Pulpas from "./components/pulpas";
import Brotes from "./components/brotes";
import Botanas from "./components/botanas";
import AboutUs from "./components/aboutus";
import Stars from "./components/stars";
import AvisoPriv from "./components/avisoprivacidad";
import OrdenAdmin from "./componentsAdmin/adminorden";
import Confirm from "./components/confirmar";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Hero />
              </div>
            }
          />
          <Route
            path="/estrellas"
            element={
              <div>
                <Stars />
              </div>
            }
          />
          <Route
            path="/conocenos"
            element={
              <div>
                <AboutUs />
              </div>
            }
          />
          <Route
            path="/frutas"
            element={
              <div>
                <Frutas />
              </div>
            }
          />
          <Route
            path="/verduras"
            element={
              <div>
                <Verduras />
              </div>
            }
          />
          <Route
            path="/chilessecos"
            element={
              <div>
                <Chiles />
              </div>
            }
          />
          <Route
            path="/frutossecosysemillas"
            element={
              <div>
                <Semillas />
              </div>
            }
          />
          <Route
            path="/especias"
            element={
              <div>
                <Especias />
              </div>
            }
          />
          <Route
            path="/cerealesyleguminosas"
            element={
              <div>
                <Cereales />
              </div>
            }
          />
          <Route
            path="/hierbasaromaticas"
            element={
              <div>
                <Hierbas />
              </div>
            }
          />
          <Route
            path="/pulpas"
            element={
              <div>
                <Pulpas />
              </div>
            }
          />
          <Route
            path="/brotesygerminados"
            element={
              <div>
                <Brotes />
              </div>
            }
          />
          <Route
            path="/botanas"
            element={
              <div>
                <Botanas />
              </div>
            }
          />
          <Route
            path="/carrito"
            element={
              <div>
                <CartN />
              </div>
            }
          />
          <Route
            path="/confirmar"
            element={
              <div>
                <Confirm />
              </div>
            }
          />
          <Route
            path="/registrarme"
            element={
              <div>
                <Register />
              </div>
            }
          />
          <Route
            path="/micuenta"
            element={
              <div>
                <Account />
              </div>
            }
          />
          <Route
            exact
            path={"/ordenadmin/:ordenId"}
            element={
              <div>
                <OrderP />
              </div>
            }
          />
          <Route
            path="/avisoprivacidad"
            element={
              <div>
                <AvisoPriv />
              </div>
            }
          />
          <Route
            path="/portaladmin"
            element={
              <div>
                <OrdenAdmin />
              </div>
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
