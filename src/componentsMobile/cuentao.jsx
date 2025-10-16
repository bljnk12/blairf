import React, { useState, useEffect, useContext } from "react";
import Order from "./orden";
import AuthContext from "../components/AuthContext";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

export default function MisOrdenes() {
  const { user } = useContext(AuthContext);

  const usuarioId = parseInt(user?.user_id);

  const [elementVisible, setElementVisible] = useState(false);

  const GET_ORDEN = gql`
    query GetOrdenes($cliente: ID!) {
      orden(cliente: $cliente) {
        id
        dia
        total
        factura
      }
    }
  `;

  const {
    loading: loadingO,
    error: errorO,
    data: dataO,
  } = useQuery(GET_ORDEN, {
    variables: {
      cliente: usuarioId,
    },
  });

  const ordenes = dataO?.orden;

  useEffect(() => {
    if (ordenes.length === 0) {
      setElementVisible(true);
    } else {
      setElementVisible(false);
    }
  }, [ordenes]);

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
          {ordenes?.map((orden) => {
            return <Order orden={orden} key={orden.id} />;
          })}
        </>
      )}
    </div>
  );
}
