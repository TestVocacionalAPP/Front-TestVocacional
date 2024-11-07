import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from '../config/helper';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  private apiUrl = `${baserUrl}/api/comentarios`;
  constructor(private http: HttpClient) {}

  agregarComentario(expertoId: number, contenido: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/agregar/${expertoId}`, contenido, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  listarComentariosPorExperto(expertoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/experto/${expertoId}`);
  }

  // Método para editar un comentario específico
  editarComentario(comentarioId: number, nuevoContenido: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/editar/${comentarioId}`, { contenido: nuevoContenido }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Método para eliminar un comentario específico
  eliminarComentario(comentarioId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/eliminar/${comentarioId}`);
  }
}
