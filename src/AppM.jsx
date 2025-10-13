import "./App.css";
import { Routes, Route, HashRouter } from "react-router-dom";
import HeroM from "./componentsMobile/heroM";
import LoginPage from "./componentsMobile/loginpage";
import AboutUs from "./componentsMobile/aboutus";
import Mision from "./componentsMobile/mision";
import Vision from "./componentsMobile/vision";
import Contact from "./componentsMobile/contact";
import Confirm from "./componentsMobile/confirmar";

function AppM() {
  return (
    <div className="AppM">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <HeroM />
              </div>
            }
          />
          <Route
            path="/loginpage"
            element={
              <div>
                <LoginPage />
              </div>
            }
          />
          <Route
            path="/aboutus"
            element={
              <div>
                <AboutUs />
              </div>
            }
          />
          <Route
            path="/mision"
            element={
              <div>
                <Mision />
              </div>
            }
          />
          <Route
            path="/vision"
            element={
              <div>
                <Vision />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div>
                <Contact />
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
        </Routes>
      </HashRouter>
    </div>
  );
}

export default AppM;
