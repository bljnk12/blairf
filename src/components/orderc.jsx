import { useEffect, useState, useContext } from "react";
import { jsPDF } from "jspdf";
import ItemCA from "./itemCa";
import { ProductContext } from "./ProductContext";
import logo from "./media/fulllogo.png";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const OrderC = ({ orden }) => {
  const {
    id,
    ordenId,
    clienteNombre,
    total,
    dia,
    factura,
    direccionEnvio,
    confirmada,
  } = orden;

  const [solFactura, setSolFactura] = useState(factura);

  const UpFactura = {
    factura: !solFactura,
  };

  const GET_ARTICULO = gql`
    query GetItems($orden: ID!) {
      articulo(orden: $orden) {
        id
        producto {
          nombre
        }
        unidad
        precio
        cantidad
        preciof
        cantidadf
      }
    }
  `;

  const {
    loading: loadingI,
    error: errorI,
    data: dataI,
  } = useQuery(GET_ARTICULO, {
    variables: {
      orden: id,
    },
  });

  const items = dataI?.articulo;

  const [showTest, setShowTest] = useState(false);

  const showTestBtn = () => {
    setShowTest(!showTest);
    console.log(items);
  };

  //-----------PDF------------//

  const doc = new jsPDF();

  let info = [];

  items?.forEach((element, index, array) => {
    info.push([
      element.producto.nombre,
      element.unidad,
      element.precio,
      element.cantidad,
    ]);
  });

  let opciones = { year: "numeric", month: "short", day: "numeric" };
  let fecha = new Date(dia)
    .toLocaleDateString("es", opciones)
    .replace(/ /g, "-")
    .replace(".", "")
    .replace(/-([a-z])/, function (x) {
      return "-" + x[1].toUpperCase();
    });
  //console.log(fecha);

  const print = () => {
    doc.addImage(logo, 150, 5, 48, 20);
    doc.setFontSize(15);
    doc.text("Recibo", 10, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha} `, 10, 30);
    doc.text("Blairfoods", 10, 40);
    doc.text("billing@blairfoods.com", 10, 47);
    doc.text(`Orden id: ${ordenId} `, 10, 57);
    doc.text(`Cliente: ${clienteNombre} `, 10, 64);
    doc.text(`Dirección: ${direccionEnvio} `, 10, 71);
    doc.text(`Total: $${total} `, 10, 78);

    doc.text("Articulos", 95, 95);
    doc.autoTable({
      theme: "striped",
      headStyles: {
        fillColor: [70, 85, 108], // Darker gray for the header (optional)
        textColor: 255, // White text for the header
      },
      startX: 10,
      startY: 102,
      head: [["Producto", "Unidad", "Precio", "Cantidad"]],
      body: info,
    });
    doc.save(`orden-${ordenId}.pdf`);
  };

  //-----------PDF------------//

  // const showData = () => {
  //   showTotalAct();
  // };

  return (
    <div className="ordenes-cliente">
      <div className="ordenes-detail">
        <table className="order-detail-table">
          <tr>
            <td className="order-detail-row">{fecha}</td>
            <td className="order-detail-row">{total}</td>
            <td className="order-detail-row odrf">
              {solFactura === true ? (
                <i
                  class="fa-solid fa-circle-check"
                  style={{ color: "#48bb78" }}
                  //onClick={updateF}
                />
              ) : (
                <i
                  class="fa-solid fa-circle-xmark"
                  style={{ color: "#f56565" }}
                  //onClick={updateF}
                />
              )}
            </td>
            <td className="order-detail-row">
              <button onClick={showTestBtn}>
                <i class="fa-solid fa-bag-shopping"></i>Ver
              </button>
            </td>
            <td className="order-detail-row odrc">
              <i
                class="fa-solid fa-circle-check"
                style={{
                  color: confirmada === true ? "#BED754" : "#cbd5e0",
                }}
              />
            </td>
            <td className="order-detail-row">
              <button onClick={print}>
                <i class="fa-solid fa-print"></i>Imprimir
              </button>
            </td>
          </tr>
        </table>
      </div>

      {showTest && (
        <div className="order-detail-cont">
          <div className="order-detail-mod">
            <div className="art-ord-title">
              <div>Articulos Ordenados</div>
              <i class="fa-solid fa-circle-xmark" onClick={showTestBtn}></i>
            </div>
            <div className="odp-table-cd">
              <div className="title-oi">
                <div className="toi-1">Producto</div>
                <div className="toi-2">Unidad</div>
                <div className="toi-3">Precio</div>
                <div className="toi-4">Cantidad</div>
                <div className="toi-5">Subtotal</div>
              </div>
              <div className="odp-table-cd-items">
                {items?.map((item) => {
                  return <ItemCA item={item} key={item.id} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderC;
