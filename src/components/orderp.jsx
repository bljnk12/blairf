import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderPA from "./orderpa";
import logo from "./media/fulllogo.png";
import ItemPA from "./itemPa";
import { autoTable } from "jspdf-autotable";
import { jsPDF } from "jspdf";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const OrderP = () => {
  const { ordenId } = useParams();

  const GET_ORDEN = gql`
    query GetOrdenP($id: ID!) {
      ordenP(id: $id) {
        id
        clienteNombre
        total
        dia
        envio
        pago
        factura
        direccionEnvio
        estatus
        completa
      }
    }
  `;

  const {
    loading: loadingO,
    error: errorO,
    data: dataO,
  } = useQuery(GET_ORDEN, {
    variables: {
      id: ordenId,
    },
  });

  const orden = dataO?.ordenP;

  const showData = () => {
    console.log(orden);
  };

  //-----------------------------

  const [facturacion, setFacturacion] = useState("");

  const mostrarFactura = () => {
    if (orden?.factura === true) {
      setFacturacion("si");
    } else {
      setFacturacion("no");
    }
  };

  useEffect(() => {
    mostrarFactura();
  }, [facturacion]);

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
      }
    }
  `;

  const {
    loading: loadingI,
    error: errorI,
    data: dataI,
  } = useQuery(GET_ARTICULO, {
    variables: {
      orden: orden?.id,
    },
  });

  const items = dataI?.articulo;

  const [showTest, setShowTest] = useState(false);

  const showTestBtn = () => {
    setShowTest(!showTest);
  };

  function closeTest() {
    setShowTest(false);
  }

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

  let opciones = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let fecha = new Date(orden?.dia)
    .toLocaleDateString("es", opciones)
    .replace(/ /g, "-")
    .replace(".", "")
    .replace(/-([a-z])/, function (x) {
      return "-" + x[1].toUpperCase();
    });
  console.log(fecha);

  const print = () => {
    doc.addImage(logo, 150, 5, 48, 20);
    doc.setFontSize(15);
    doc.text("Recibo", 10, 20);
    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha} `, 10, 30);
    doc.text("Blairfoods", 10, 40);
    doc.text("billing@blairfoods.com", 10, 47);
    doc.text(`Orden id: ${orden?.id} `, 10, 57);
    doc.text(`Cliente: ${orden?.clienteNombre} `, 10, 64);
    doc.text(`Dirección: ${orden?.direccionEnvio} `, 10, 71);
    doc.text(`Total: $${orden?.total} `, 10, 78);
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
    doc.save(`orden-${orden?.id}.pdf`);
  };

  return (
    <div className="adminorder">
      <div className="userorder-pa">
        <div className="ordenes-cliente-pa">
          <div className="logo-pa">
            <img src={logo} alt="Logo de la empresa" width={220} class="logo" />
          </div>
          <div className="ordenes-detail-pa">
            <div className="ordenes-detail-lc-pa">
              <div className="oda-1">
                <div className="odt">Orden id: </div>
                <div className="odtd" id="oda-1">
                  {orden?.id}
                </div>
              </div>
              <div className="oda-2">
                <div className="odt">Cliente: </div>
                <div className="odtd" id="oda-2">
                  {orden?.clienteNombre}
                </div>
              </div>
              <div className="oda-2">
                <div className="odt">Dirección: </div>
                <div className="odtd" id="oda-2">
                  {orden?.direccionEnvio}
                </div>
              </div>
              <div className="oda-3">
                <div className="odt">Fecha: </div>
                <div className="odtd" id="oda-3">
                  {fecha}
                </div>
              </div>
              <div className="oda-4">
                <div className="odt">Total: </div>
                <div className="odtd" id="oda-4">
                  ${orden?.total}
                </div>
              </div>
              <div className="oda-5">
                <div className="odt">Estatus: </div>
                <div className="odtd" id="oda-5">
                  {orden?.estatus}
                </div>
              </div>
            </div>
            <div className="ordenes-detail-rc-pa">
              <div className="oda-6">
                <button onClick={print}>
                  <i class="fa-solid fa-print"></i>Imprimir
                </button>
              </div>
            </div>
          </div>

          <div className="orden-detail-products-pa">
            <div id="odp-table-pa">
              <div className="title-pa">Articulos</div>
              <div className="title-oi-pa">
                <div className="toi-1">Producto</div>
                <div className="toi-2">Unidad</div>
                <div className="toi-3">Precio</div>
                <div className="toi-4">Cantidad</div>
              </div>
              {items?.map((item) => {
                return <ItemPA item={item} key={item.id} />;
              })}
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={showData}>ver orden</button> */}
    </div>
  );
};

export default OrderP;
