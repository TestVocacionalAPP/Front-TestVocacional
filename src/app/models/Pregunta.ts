
export interface Pregunta {
  idPregunta: number;
  enunciado: string;
  respuestaSiNo?: boolean;

  puntaje?: number;
  tipoPregunta?: string;
}
