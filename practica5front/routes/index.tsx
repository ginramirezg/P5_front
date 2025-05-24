import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Signal } from "@preact/signals";
import PanelConversacion from "../islands/PanelConversacion.tsx";
import ListaDeContactos from "../islands/ListaDeContactos.tsx";
import type { DatosContacto } from "../types.ts";

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, DatosContacto>) => {
    const response = await fetch("https://back-a-p4.onrender.com/contacts/");
    const jsonResponse = await response.json();
    return ctx.render({ data: jsonResponse.data });
  },
};

const PaginaInicio = (props: PageProps<DatosContacto>) => {
  const conversacionActual = new Signal<string>("");
  const datosContactos = props.data.data;
  return (
    <div class="contenedor">
      <div class="barra-lateral">
        <ListaDeContactos
          contactos={datosContactos}
          conversacionActual={conversacionActual}
        />
      </div>
      <div class="contenido-principal">
        <PanelConversacion conversacionActual={conversacionActual} />
      </div>
    </div>
  );
};

export default PaginaInicio;
