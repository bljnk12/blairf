import { useEffect, useState, useContext } from "react";
import { jsPDF } from "jspdf";
import ItemCA from "./itemCa";
import { ProductContext } from "../components/ProductContext";
import logo from "./media/fulllogo.png";

const Order = ({ orden }) => {
  const { id, ordenId, clienteNombre, total, dia, factura, confirmada } = orden;

  const [solFactura, setSolFactura] = useState(factura);

  const UpFactura = {
    factura: !solFactura,
  };

  let updateF = async () => {
    setSolFactura(!solFactura);

    fetch(`http://localhost:8000/blairfoodsb/orden/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpFactura),
    });
  };

  const [items, setItems] = useState([]);
  const [orderitems, setOrderItems] = useState([]);

  useEffect(() => {
    const Items = () => {
      getItems();
    };
    Items();
  }, []);

  let getItems = async () => {
    let response = await fetch(
      "http://localhost:8000/blairfoodsb/item/create/"
    );
    let data = await response.json();
    setItems(data);
    // console.log(data)
  };

  useEffect(() => {
    const itemsDelUsuario = items?.filter((item) => item.ordenId === ordenId);
    setOrderItems(itemsDelUsuario);
  }, [items]);

  const [showTest, setShowTest] = useState(false);

  const showTestBtn = () => {
    setShowTest(!showTest);
  };

  //-----------PDF------------//

  const { products } = useContext(ProductContext);

  const doc = new jsPDF();

  let info = [];

  orderitems?.forEach((element, index, array) => {
    const nombres = products?.find((item) => {
      return item.id === element.producto;
    });
    info.push([
      nombres?.nombre,
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
    doc.addImage(logo, 80, 10, 50, 20);
    doc.text(`Orden id: ${ordenId} `, 10, 50);
    doc.text(`Cliente: ${clienteNombre} `, 10, 60);
    doc.text(`Fecha: ${fecha} `, 10, 70);
    doc.text(`Total: $${total} `, 10, 80);

    doc.text("Articulos", 80, 100);
    doc.autoTable({
      theme: "plain",
      styles: { fontSize: 13 },
      margin: { top: 110 },
      head: [["Producto", "Unidad", "Precio", "Cantidad"]],
      body: info,
    });

    doc.save(`${ordenId}.pdf`);
  };

  //-----------PDF------------//

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
                  style={{ color: "#BED754" }}
                  onClick={updateF}
                />
              ) : (
                <i
                  class="fa-solid fa-circle-xmark"
                  style={{ color: "#f56565" }}
                  onClick={updateF}
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
                  color: confirmada === true ? "#63b3ed" : "#cbd5e0",
                }}
              />
            </td>
            {/* <td className="order-detail-row">
              <button onClick={print}>
                <i class="fa-solid fa-print"></i>Imprimir
              </button>
            </td> */}
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
                {orderitems?.map((item) => {
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

export default Order;
