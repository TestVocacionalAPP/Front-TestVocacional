import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from '../config/helper';
import { TestCreationDTO } from '../models/TestCreationDT';
import { TestResponseDTO } from '../models/TestResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  private apiUrl = `${baserUrl}/api/tests`;

  constructor(private http: HttpClient) {}

  obtenerPreguntasPorTest(idTest: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idTest}/preguntas`);
  }

  // Servicio para crear un test
  crearTest(testCreationDTO: TestCreationDTO): Observable<TestResponseDTO> {
    const url = `${this.apiUrl}/crear`;
    return this.http.post<TestResponseDTO>(url, testCreationDTO);
  }

  // Servicio para cargar preguntas desde un archivo
  cargarPreguntasDesdeCSV(file: File, idTest: number): Observable<void> {
    const url = `${this.apiUrl}/upload-excel/${idTest}`;
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<void>(url, formData);
  }

  crearTestConPreguntas(titulo: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append('file', file);

    return this.http.post(`${this.apiUrl}/crear-con-preguntas`, formData);
  }

}
