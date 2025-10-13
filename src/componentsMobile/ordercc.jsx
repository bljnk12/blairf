import React from "react";

const OrderCC = ({ orden, getOrden, getid }) => {
  const { id, ordenId, total, dia, estatus } = orden;

  const getOrdenId = () => {
    getOrden(ordenId);
    getid(id);
  };

  let opciones = { year: "numeric", month: "short", day: "numeric" };
  let fecha = new Date(dia)
    .toLocaleDateString("es", opciones)
    .replace(/ /g, "-")
    .replace(".", "")
    .replace(/-([a-z])/, function (x) {
      return "-" + x[1].toUpperCase();
    });

  return (
    <div className="ordenes-cliente-cc">
      <table className="order-detail-table-cc">
        <tr>
          <td className="order-detail-row">
            <i class="fa-solid fa-bag-shopping"></i> Pedido colocado
          </td>
          <td className="order-detail-row">{fecha}</td>
          <td className="order-detail-row">{total}</td>
          <td className="order-detail-row">
            <button className="odtcc-btn" onClick={getOrdenId}>
              Ver
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default OrderCC;
