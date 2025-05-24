export type ContactoPersona = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  chatId: string;
};

export type DatosContacto = {
  data: ContactoPersona[];
};

export type MensajeConversacion = {
  _id: string;
  chatId: string;
  isContactMessage: boolean;
  content: string;
  timestamp: string;
};

export type DatosMensaje = {
  data: MensajeConversacion[];
};
