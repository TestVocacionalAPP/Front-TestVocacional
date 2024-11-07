import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';
import baserUrl from '../config/helper';
import { UsuarioPerfilDTO } from '../models/UsuarioPerfilDTO';
import { UsuarioUpdateDTO } from '../models/UsuarioUpdateDTO';

interface JwtPayload {
  id: number;
  username: string;
  role: string;
  userId: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${baserUrl}/usuarios`;
  private contra = `${baserUrl}/password`;

  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserRole = new BehaviorSubject<string>('');
  private currentUserName = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private router: Router) {
    this.checkToken();
  }

  public login(correo: string, password: string): Observable<any> {
    const loginData = { correo, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(`${this.apiUrl}/login`, loginData, { headers }).pipe(
      map((response: any) => {
        const token = response.token;
        if (token) {
          this.setToken(token); // Almacena el token en localStorage
          const decodedToken = jwtDecode<JwtPayload>(token);
          console.log('Token decodificado:', decodedToken);

          const role = decodedToken.role || decodedToken.role;
          if (role) {
            this.currentUserRole.next(role);
            console.log('Rol del usuario:', role);
            // Redirigir al dashboard correspondiente basado en el rol
            if (role === 'ADMIN') {
              this.router.navigate(['/admin']);
            } else if (role === 'EXPERTO') {
              this.router.navigate(['/experto']);
            } else if (role === 'USER') {
              this.router.navigate(['/user']);
            } else {
              this.router.navigate(['/']); // Redirige al inicio en caso de rol desconocido
            }
          } else {
            console.error('El token no contiene el campo de rol esperado');
          }
          this.currentUserName.next(decodedToken.username);
        }
        return response;
      })
    );
  }

  public register(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, user, { headers });
  }

  obtenerPerfil(): Observable<UsuarioPerfilDTO> {
    return this.http.get<UsuarioPerfilDTO>(`${this.apiUrl}/perfil`);
  }

  actualizarPerfil(
    usuarioUpdateDTO: UsuarioUpdateDTO
  ): Observable<UsuarioPerfilDTO> {
    return this.http.put<UsuarioPerfilDTO>(
      `${this.apiUrl}/actualizar`,
      usuarioUpdateDTO
    );
  }

  eliminarCuenta(): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/eliminar`);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(
      `${this.contra}/reset`,
      { email },
      { responseType: 'text' }
    );
  }
  actualizarImagenPerfil(imagenBase64: string): Observable<UsuarioPerfilDTO> {
    return this.http.put<UsuarioPerfilDTO>(`${this.apiUrl}/perfil/imagen`, { imagenBase64 });
  }



  validateToken(email: string, token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.contra}/validate`, { email, token });
  }

  updatePassword(
    email: string,
    token: string,
    newPassword: string
  ): Observable<any> {
    const url = `${this.contra}/update`;
    const body = { email, token, newPassword };
    return this.http.post(url, body, { responseType: 'text' as 'json' });
  }

  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.currentUserRole.next('');
    this.currentUserName.next('');
  }

  public getRole(): Observable<string> {
    return this.currentUserRole.asObservable();
  }

  public getUserName(): Observable<string> {
    return this.currentUserName.asObservable();
  }

  private checkToken(): void {
    const token = this.getToken();
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      this.currentUserRole.next(decodedToken.role);
      this.currentUserName.next(decodedToken.username);
      this.loggedIn.next(true);
    }
  }

  public isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
  public getUsuarioId(): number | null {
    const token = this.getToken();
    if (token) {
      const decoded: JwtPayload = jwtDecode(token);
      console.log('Token decodificado:', decoded);
      return decoded.userId || null;
    }
    return null;
  }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp > currentTime;
      } catch (error) {
        console.error('Error al decodificar el token:', error);
        return false;
      }
    }
    return false;
  }
}
