import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderPA from "./orderpa";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const OrderP = () => {
  const { ordenId } = useParams();

  const usuario = parseInt(user?.user_id);

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
      cliente: usuario,
    },
  });

  const ordenes = dataO?.orden;

  return (
    <div className="adminorder">
      <div className="userorder-pa">
        {ordenes?.map((orden) => {
          return <OrderPA orden={orden} key={orden.id} />;
        })}
      </div>
    </div>
  );
};

export default OrderP;
