import React, { useEffect, useState } from "react";

export default function ODirectionC({ direction, pickDirection, dir }) {
  const { id, calle, ninterior, nexterior, colonia, ciudad, estado, cp } =
    direction;

  const direccion =
    calle +
    " " +
    calle +
    " " +
    ninterior +
    " " +
    nexterior +
    " " +
    colonia +
    " " +
    ciudad +
    " " +
    estado +
    " " +
    cp;

  const getDirection = () => {
    pickDirection(direccion);
  };

  const [chosen, setChosen] = useState(false);

  useEffect(() => {
    if (dir === direccion) {
      setChosen(true);
    }
    if (dir !== direccion) {
      setChosen(false);
    }
  }, [dir]);

  return (
    <div className="direccion">
      <div className="one-directionc" onClick={getDirection}>
        <div className="od-dir-check">
          {calle}, {ninterior}, {nexterior}, {colonia}, {ciudad}, {estado}, {cp}
        </div>
        <div className="check-button-cont">
          <i
            class="fa-solid fa-circle-check"
            style={{
              color: chosen === true ? "#BED754" : "#f4f5f9",
            }}
          />
        </div>
      </div>
    </div>
  );
}
