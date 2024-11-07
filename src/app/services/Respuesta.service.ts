import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from '../config/helper';
import { RespuestaDTO } from 'src/app/models/RespuestaDTO';
export interface Carrera {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen?: string; // Propiedad opcional para imagen
}
@Injectable({
  providedIn: 'root',
})
export class RespuestasService {
  private apiUrl = `${baserUrl}/api/respuestas`;

  constructor(private http: HttpClient) {}

  enviarRespuestas(
    respuestas: RespuestaDTO[],
    idTest: number
  ): Observable<{ mensaje: string; historialTestId: number }> {
    return this.http.post<{ mensaje: string; historialTestId: number }>(
      `${this.apiUrl}/responder`,
      respuestas,
      {
        params: { idTest: idTest.toString() },
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  calcularResultados(
    idTest: number,
    historialTestId: number
  ): Observable<Map<string, any>> {
    return this.http.get<Map<string, any>>(
      `${this.apiUrl}/calcular/${idTest}/${historialTestId}`
    );
  }
  sugerenciasCarrera(idTest: number, historialTestId: number): Observable<any> {
    const url = `${this.apiUrl}/${historialTestId}/carreras-sugeridas?idTest=${idTest}`;
    return this.http.get<any>(url);
  }

}
