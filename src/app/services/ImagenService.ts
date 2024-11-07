// src/app/services/Imagen.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {

  constructor() {}

  // Método para obtener la URL de la imagen de Google Drive
  obtenerUrlImagen(id: string): string {
    return `https://drive.google.com/uc?id=${id}`;
  }
}
