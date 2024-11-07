// src/app/models/experto.model.ts
export interface Experto {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  calificacion: number;
  descripcion: string;
  tarifa: number;
  imagenBase64?: string;
  likes: number;
  telefono: string;
  correo: string;
}
