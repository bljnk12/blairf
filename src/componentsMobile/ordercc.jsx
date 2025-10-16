import React from "react";

const OrderCC = ({ orden, getid }) => {
  const { id, total, dia, estatus } = orden;

  const getId = () => {
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
      <div className="order-detail-table-cc">
        <div>
          <div className="order-detail-row">
            <i class="fa-solid fa-bag-shopping"></i> Pedido colocado
          </div>
          <div className="order-detail-row">{fecha}</div>
          <div className="order-detail-row">{total}</div>
          <div className="order-detail-row">
            <button className="odtcc-btn" onClick={getId}>
              Ver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCC;
