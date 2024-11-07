import { PreguntaDTO } from "./PreguntaDTO";

export interface TestResponseDTO {
  id: number;
  nombre: string;
  descripcion: string;
  fechaCreacion: Date;
  preguntas: PreguntaDTO[];
}
