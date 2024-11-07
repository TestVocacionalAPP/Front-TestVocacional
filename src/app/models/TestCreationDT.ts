import { PreguntaDTO } from "./PreguntaDTO";

export interface TestCreationDTO {
  nombre: string;
  descripcion: string;
  preguntas?: PreguntaDTO[];
}
