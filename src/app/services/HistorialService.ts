import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from '../config/helper';

// src/app/models/historial-test.model.ts
export interface HistorialTest {
  id: number;
  nombreTest: string;
  fecha: Date;
  resultado: string;
  categoriaMayorInteres: string;
  categoriaMayorAptitud: string;
  mensajeIntereses: string;
  mensajeCarreras: string;
}

@Injectable({
  providedIn: 'root',
})
export class HistorialService {
  private apiUrl = `${baserUrl}/api/historial`;
  private apiu = `${baserUrl}/api/reportes`;

  constructor(private http: HttpClient) {}

  obtenerHistorialPorUsuario(): Observable<HistorialTest[]> {
    return this.http.get<HistorialTest[]>(`${this.apiUrl}/usuario`);
  }

  descargarPDF(historialTestId: number): Observable<Blob> {
    return this.http.get(`${this.apiu}/descargar/${historialTestId}`, {
      responseType: 'blob',
      headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }),
    });
  }
}
