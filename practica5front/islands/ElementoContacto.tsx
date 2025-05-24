import type { FunctionalComponent } from "preact";
import type { ContactoPersona } from "../types.ts";
import { Signal } from "@preact/signals";

type ElementoProps = {
  datosContacto: ContactoPersona;
  conversacionActual: Signal<string>;
};

const ElementoContacto: FunctionalComponent<ElementoProps> = ({ datosContacto, conversacionActual }) => {
  const activarConversacion = () => {
    conversacionActual.value = datosContacto.chatId;
  };

  return (
    <div class="contacto-elemento" onClick={activarConversacion}>
      <div>{datosContacto.name}</div>
      <div>{datosContacto.phone}</div>
    </div>
  );
};

export default ElementoContacto;
