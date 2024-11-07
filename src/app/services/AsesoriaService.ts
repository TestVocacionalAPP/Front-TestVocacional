import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import baserUrl from '../config/helper';

export interface AsesoriaCreateDTO {
  expertoId: number;
  asunto: string;
  fechaSolicitada: string;
  descripcion: string; // Nuevo campo si se usa
  metodoContacto: string; // Nuevo campo si se usa
  duracion: number; // Nuevo campo si se usa
}

export interface AsesoriaResponseDTO {
  id: number;
  asunto: string;
  fechaSolicitada: string;
  fechaConfirmada: string | null;
  estado: string;
}

@Injectable({
  providedIn: 'root',
})
export class AsesoriaService {
  private apiUrl = `${baserUrl}/api/asesorias`;

  constructor(private http: HttpClient) {}

  solicitarAsesoria(
    asesoriaCreateDTO: AsesoriaCreateDTO
  ): Observable<AsesoriaResponseDTO> {
    return this.http.post<AsesoriaResponseDTO>(
      `${this.apiUrl}/solicitar`,
      asesoriaCreateDTO
    );
  }

  obtenerAsesoriasPorExperto(): Observable<AsesoriaResponseDTO[]> {
    return this.http.get<AsesoriaResponseDTO[]>(
      `${this.apiUrl}/experto/solicitudes`
    );
  }

  aceptarAsesoria(asesoriaId: number): Observable<AsesoriaResponseDTO> {
    return this.http.post<AsesoriaResponseDTO>(`${this.apiUrl}/confirmar/${asesoriaId}`, {});
  }

  rechazarAsesoria(asesoriaId: number): Observable<AsesoriaResponseDTO> {
    return this.http.post<AsesoriaResponseDTO>(`${this.apiUrl}/rechazar/${asesoriaId}`, {});
  }

  verificarYNotificarCitas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/verificar`);
  }
}
