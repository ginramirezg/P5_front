import type { FunctionalComponent, JSX } from "preact";
import { Signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import type { DatosMensaje, MensajeConversacion } from "../types.ts";

type PanelConversacionProps = {
  conversacionActual: Signal<string>;
};

const obtenerConversacion = async (
  props: PanelConversacionProps
): Promise<MensajeConversacion[]> => {
  if (props.conversacionActual.value === "") return [];
  const res = await fetch(
    `https://back-a-p4.onrender.com/messages/chat/${props.conversacionActual.value}`
  );
  const resultado: DatosMensaje = await res.json();
  return resultado.data;
};

const PanelConversacion: FunctionalComponent<PanelConversacionProps> = (props) => {
  const [mensajes, setMensajes] = useState<MensajeConversacion[]>([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    const cargarConversacion = async () => {
      if (props.conversacionActual.value !== "") {
        const conversacion = await obtenerConversacion(props);
        setMensajes(conversacion);
      }
    };
    cargarConversacion();
  }, [props.conversacionActual.value]);

  const enviarMensaje = async (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    if (texto.trim() === "" || props.conversacionActual.value === "") return;
    const dataPayload = {
      chatId: props.conversacionActual.value,
      isContactMessage: false,
      content: texto,
    };
    try {
      const resp = await fetch("https://back-a-p4.onrender.com/messages/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataPayload),
      });
      if (!resp.ok) {
        console.error("Error al enviar mensaje:", await resp.text());
      } else {
        const conversacion = await obtenerConversacion(props);
        setMensajes(conversacion);
        setTexto("");
      }
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
    }
  };

  return (
    <div class="panel-conversacion">
      <div class="cabecera-mensajes">Chat Activo: {props.conversacionActual.value}</div>
      <div class="contenedor-mensajes">
        {mensajes.map((msg) => (
          <div
            key={msg._id}
            class={`mensaje ${msg.isContactMessage ? "izquierda" : "derecha"}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
      <form onSubmit={enviarMensaje}>
        <input
          type="text"
          value={texto}
          onInput={(e) => setTexto((e.target as HTMLInputElement).value)}
          placeholder="Escribe un mensaje..."
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default PanelConversacion;
