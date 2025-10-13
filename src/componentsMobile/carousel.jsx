import frutasimg from "./media/frutasb.png";
import verdurasimg from "./media/verduras.jpeg";
import chilesimg from "./media/chilessecos.jpg";
import frutosimg from "./media/semillas.png";
import especiasimg from "./media/especias.png";
import cerealesimg from "./media/cereales.png";
import hierbasimg from "./media/hierbas.png";
import brotesimg from "./media/brotes.png";
import botanasimg from "./media/chips.png";

const Carousel = ({
  frutas,
  verduras,
  chiles,
  frutos,
  especias,
  cereales,
  hierbas,
  brotes,
  botanas,
}) => {
  return (
    <div className="carousel">
      <div className="carousel-i" onClick={frutas}>
        <img src={frutasimg} width={130} height={100} alt="" />
        <p>Frutas</p>
      </div>
      <div className="carousel-i" onClick={verduras}>
        <img src={verdurasimg} width={130} height={100} alt="" />
        <p>Verduras</p>
      </div>
      <div className="carousel-i" onClick={chiles}>
        <img src={chilesimg} width={130} height={100} alt="" />
        <p>Chiles secos</p>
      </div>
      <div className="carousel-i" onClick={frutos}>
        <img src={frutosimg} width={130} height={100} alt="" />
        <p>Frutos secos y semillas</p>
      </div>
      <div className="carousel-i" onClick={especias}>
        <img src={especiasimg} width={130} height={100} alt="" />
        <p>Especias</p>
      </div>
      <div className="carousel-item" onClick={cereales}>
        <img src={cerealesimg} width={130} height={100} alt="" />
        <p>Cereales y leguminosas</p>
      </div>
      <div className="carousel-i" onClick={hierbas}>
        <img src={hierbasimg} width={130} height={100} alt="" />
        <p>hierbas aromáticas</p>
      </div>
      <div className="carousel-i" onClick={brotes}>
        <img src={brotesimg} width={130} height={100} alt="" />
        <p>Brotes y germinados</p>
      </div>
      <div className="carousel-i" onClick={botanas}>
        <img src={botanasimg} width={130} height={100} alt="" />
        <p>Botanas</p>
      </div>
    </div>
  );
};

export default Carousel;
