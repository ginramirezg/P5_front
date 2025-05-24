import type { FunctionalComponent } from "preact";
import type { ContactoPersona } from "../types.ts";
import { Signal } from "@preact/signals";
import ElementoContacto from "./ElementoContacto.tsx";

type ListaProps = {
  contactos: ContactoPersona[];
  conversacionActual: Signal<string>;
};

const ListaDeContactos: FunctionalComponent<ListaProps> = ({ contactos, conversacionActual }) => {
  return (
    <>
      
      <a href="/CrearContacto">
        <button type="submit"style="margin: 10px; padding: 10px; font-size: 16px;">
          Nuevo Contacto
        </button>
      </a>
      {contactos.map((contacto) => (
        <ElementoContacto
          key={contacto._id}
          datosContacto={contacto}
          conversacionActual={conversacionActual}
        />
      ))}
    </>
  );
};

export default ListaDeContactos;
