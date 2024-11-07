import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import baserUrl from '../config/helper';
import { Carrera } from '../models/Carrera';


@Injectable({
  providedIn: 'root'
})
export class CarreraService {
  private apiUrl = `${baserUrl}/api/carreras`;

  constructor(private http: HttpClient) {}

  obtenerCarreras(): Observable<Carrera[]> {
    return this.http.get<Carrera[]>(`${this.apiUrl}/carreras`);
  }
}
