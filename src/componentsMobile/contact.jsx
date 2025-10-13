import { useState } from "react";

export default function Contact() {
  const [nombre, setNombre] = useState();
  const [email, setEmail] = useState();
  const [comentario, setComentario] = useState();

  const mensaje = {
    nombre: nombre,
    email: email,
    comentario: comentario,
  };

  let submit = async () => {
    fetch("http://localhost:8000/blairfoodsb/clientes/create/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mensaje),
    });
    alert("Mensaje enviado!");
  };

  return (
    <div className="contact">
      <div>
        <i class="fa-brands fa-whatsapp"></i>
        <p> 420000000</p>
      </div>
      <div>
        <i class="fa-solid fa-envelope"></i>
        <p> Email</p>
      </div>
      <div className="contact-message">
        <p>Mandanos un mensaje</p>
        <input
          className="contact-name"
          onChange={(e) => {
            setNombre(e);
          }}
          placeholder="Nombre"
        />
        <br />
        <input
          className="contact-email"
          onChange={(e) => {
            setEmail(e);
          }}
          placeholder="Email"
        />
        <br />
        <textarea
          className="contact-text"
          onChange={(e) => {
            setComentario(e);
          }}
          placeholder="Comentario"
        />
        <br />
        <div className="contact-btn">
          <button className="contact-send" onClick={submit}>
            Enviar<i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
