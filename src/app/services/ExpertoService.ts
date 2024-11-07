import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import baserUrl from '../config/helper';
import { Experto } from '../models/Experto';
import { AsesoriaResponseDTO } from './AsesoriaService';
import { ExpertoCreateDTO } from '../models/ExpertoCreateDTO';
export interface ExpertoPerfilDTO {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string; // Asegúrate de incluir esta propiedad
  especialidad: string;
  descripcion: string;
  tarifa: number;
  likes: number;
  imagenBase64: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ExpertoService {
  private apiUrl = `${baserUrl}/api/expertos`;
  private apis = `${baserUrl}/api/asesorias`;
  constructor(private http: HttpClient) {}

  obtenerTodosLosExpertos(): Observable<Experto[]> {
    return this.http.get<Experto[]>(`${this.apiUrl}/todos`);
  }
  buscarPorEspecialidad(especialidad: string): Observable<Experto[]> {
    return this.http.get<Experto[]>(`${this.apiUrl}/buscarPorEspecialidad`, {
      params: { especialidad },
    });
  }
  obtenerExpertoPorId(id: number): Observable<Experto> {
    return this.http.get<Experto>(`${this.apiUrl}/obtenerExpertoPorId/${id}`);
  }

  toggleLike(expertoId: number): Observable<Experto> {
    return this.http.put<Experto>(`${this.apiUrl}/${expertoId}/toggleLike`, {});
  }

  // En ExpertoService
  getLikeStatus(expertoId: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(
      `/api/expertos/${expertoId}/likeStatus/${userId}`
    );
  }

  obtenerNotificaciones(): Observable<AsesoriaResponseDTO[]> {
    const url = `${this.apis}/expertos/notificaciones`;
    return this.http.get<AsesoriaResponseDTO[]>(url);
  }

  crearExperto(expertoData: ExpertoCreateDTO): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<any>(`${this.apiUrl}/crear`, expertoData, { headers });
  }

  obtenerPerfil(): Observable<ExpertoPerfilDTO> {
    return this.http.get<ExpertoPerfilDTO>(`${this.apiUrl}/perfil`);
  }
  // Actualizar perfil del experto
  actualizarPerfil(expertoPerfilDTO: ExpertoPerfilDTO): Observable<ExpertoPerfilDTO> {
    return this.http.put<ExpertoPerfilDTO>(`${this.apiUrl}/editar/perfil`, expertoPerfilDTO);
  }

  // Actualizar imagen del perfil del experto
  actualizarImagenPerfil(imagenBase64: string): Observable<string> {
    const body = { imagenBase64 };
    return this.http.put<string>(`${this.apiUrl}/perfil/imagen`, body);
  }
}
