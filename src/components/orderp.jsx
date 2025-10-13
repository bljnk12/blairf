import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderPA from "./orderpa";

const OrderP = () => {
  const { ordenId } = useParams();

  const [ordenes, setOrdenes] = useState([]);
  const [userorder, setUserOrder] = useState();

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
    const userorder = ordenes?.filter((ord) => ord.ordenId === ordenId);
    setUserOrder(userorder);
  }, [ordenes]);

  return (
    <div className="adminorder">
      <div className="userorder-pa">
        {userorder?.map((orden) => {
          return <OrderPA orden={orden} key={orden.id} />;
        })}
      </div>
    </div>
  );
};

export default OrderP;
