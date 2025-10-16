import React from "react";

const OrderCC = ({ orden, getid }) => {
  const { id, total, dia, estatus, revisada } = orden;

  const getId = () => {
    getid(id);
    console.log(id);
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
    <div className="ordenes-cliente-cc" onClick={getId}>
      <div className="occc-bag">
        <i class="fa-solid fa-bag-shopping"></i>
      </div>
      <div className="occc-info">
        <div className=" occc-info-cont">
          <div className="occc-info-d1">Pedido colocado</div>
          <div className="occc-info-d2">{fecha}</div>
          <div className="occc-info-d3">${total}</div>
        </div>
      </div>
      <div className="occc-alert">
        {revisada === true ? <i class="fa-solid fa-bell"></i> : <></>}
      </div>
    </div>
  );
};

export default OrderCC;
