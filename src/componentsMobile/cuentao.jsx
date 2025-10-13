import React, { useState, useEffect, useContext } from "react";
import Order from "./orden";
import AuthContext from "../components/AuthContext";

export default function MisOrdenes() {
  const { user } = useContext(AuthContext);

  const [elementVisible, setElementVisible] = useState(false);
  const [ordenes, setOrdenes] = useState([]);
  const [userorder, setUserOrder] = useState([]);

  useEffect(() => {
    const Ordenes = () => {
      getOrdenes();
    };
    Ordenes();
  }, []);

  let getOrdenes = async () => {
    let response = await fetch(
      "http://localhost:8000/blairfoodsb/orden/create/"
    );
    let data = await response.json();
    setOrdenes(data);
    // console.log(data)
  };

  useEffect(() => {
    const userorder = ordenes.filter((ord) => ord.cliente === user?.user_id);
    setUserOrder(userorder);
  }, [ordenes]);

  useEffect(() => {
    if (userorder.length === 0) {
      setElementVisible(true);
    } else {
      setElementVisible(false);
    }
  }, [userorder]);

  return (
    <div className="userorder">
      <div className="title-userorder">
        <h5>Mis órdenes</h5>
      </div>
      {elementVisible ? (
        <div className="empty-cart-ad">No hay órdenesregistradas todavía!</div>
      ) : (
        <>
          <table className="order-detail-table">
            <tr>
              <th className="order-detail-header">Fecha</th>
              <th className="order-detail-header">Total</th>
              <th className="order-detail-header">Factura</th>
              <th className="order-detail-header">Detalle</th>
              <th className="order-detail-header">Confirmada</th>
            </tr>
          </table>
          {userorder?.map((orden) => {
            return <Order orden={orden} key={orden.id} />;
          })}
        </>
      )}
    </div>
  );
}
