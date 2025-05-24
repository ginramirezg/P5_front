import { FreshContext, Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: (_req: Request, ctx: FreshContext) => {
    return ctx.render(null);
  },
  POST: async (req: Request, _ctx: FreshContext) => {
    const formData = await req.formData();
    const nombre = formData.get("name");
    const correo = formData.get("email");
    const telefono = formData.get("phone");

    console.log(nombre, correo, telefono);

    const apiResponse = await fetch("https://back-a-p4.onrender.com/contacts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: nombre, email: correo, phone: telefono }),
    });
    if (!apiResponse.ok) {
      console.error("Error al guardar contacto:", await apiResponse.text());
      return new Response("Error al guardar contacto", { status: 500 });
    }
    const newHeaders = new Headers();
    newHeaders.set("location", "/");
    return new Response(null, { status: 303, headers: newHeaders });
  },
};

const PaginaCrearContacto = () => {
  return (
    <div class="formulario-contenedor" style="padding: 20px;">
      <form method="POST">
        <div style="margin-bottom: 10px;">
          <input type="text" name="name" placeholder="Nombre" required />
        </div>
        <div style="margin-bottom: 10px;">
          <input type="tel" name="phone" placeholder="Teléfono" required />
        </div>
        <div style="margin-bottom: 10px;">
          <input type="email" name="email" placeholder="Correo" required />
        </div>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default PaginaCrearContacto;
