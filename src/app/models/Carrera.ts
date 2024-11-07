export interface Carrera {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen?: string; // URL original
  imagenProcesada?: string; // Nueva propiedad para la URL procesada
}
