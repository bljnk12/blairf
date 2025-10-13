import logo from "./media/fulllogo.png";

export default function AboutUs() {
  return (
    <div className="aboutus">
      <div className="aboutus-logo">
        <img resizeMode="cover" src={logo} width={300} alt="" />
      </div>
      <p>
        Somos una empresa orgullosamente mexicana, motivada por la innovación y
        un profundo respeto por quienes colaboran por y para nosotros, buscando
        siempre construir relaciones auténticas y productos que marquen la
        diferencia.
      </p>
    </div>
  );
}
