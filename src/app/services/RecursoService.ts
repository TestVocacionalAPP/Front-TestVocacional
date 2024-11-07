// recurso.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from '../config/helper';

// recurso-create-dto.ts
export interface RecursoCreateDTO {
  titulo: string;
  descripcion: string;
  tipoRecurso: string;
  urlRecurso: string;
  categoriaRecurso: string;
  precio: number;
}

// recurso-response-dto.ts
export interface RecursoResponseDTO {
  id: number;
  titulo: string;
  descripcion: string;
  tipoRecurso: string;
  urlRecurso: string;
  categoriaRecurso: string;
  precio: number;
  tieneAcceso: boolean;
}

export interface CompraResponseDTO {
  id: number;
  recursoTitulo: string;
  precio: number;
  cantidad: number;
  fecha: string;
}

export interface PagoDTO {
  numeroTarjeta: string;
  tipoTarjeta: string;
}
@Injectable({
  providedIn: 'root',
})
export class RecursoService {
  private apiUrl = `${baserUrl}/api/recursos`;
  private apiaUrl = `${baserUrl}/api/compras`;
  constructor(private http: HttpClient) {}

  crearRecurso(recursoData: RecursoCreateDTO): Observable<RecursoResponseDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<RecursoResponseDTO>(
      `${this.apiUrl}/crear`,
      recursoData,
      { headers }
    );
  }

  listarRecursos(): Observable<RecursoResponseDTO[]> {
    return this.http.get<RecursoResponseDTO[]>(`${this.apiUrl}/listar`);
  }

  // recurso.service.ts
  buscarRecursosPorTitulo(titulo: string): Observable<RecursoResponseDTO[]> {
    const params = { titulo };
    return this.http.get<RecursoResponseDTO[]>(`${this.apiUrl}/buscar`, {
      params,
    });
  }

  actualizarRecurso(
    id: number,
    recursoData: RecursoCreateDTO
  ): Observable<RecursoResponseDTO> {
    return this.http.put<RecursoResponseDTO>(
      `${this.apiUrl}/actualizar/${id}`,
      recursoData
    );
  }

  eliminarRecurso(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${id}`);
  }

  comprarRecurso(id: number, pagoDTO: PagoDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/comprar`, pagoDTO);
  }

  obtenerHistorialCompras(): Observable<CompraResponseDTO[]> {
    return this.http.get<CompraResponseDTO[]>(`${this.apiaUrl}/historial`);
  }
}
