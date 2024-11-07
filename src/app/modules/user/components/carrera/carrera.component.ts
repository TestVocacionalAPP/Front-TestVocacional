import { Component, OnInit } from '@angular/core';
import { CarreraService } from 'src/app/services/carrera.service';

interface Carrera {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  imagen?: string;
}

@Component({
  selector: 'app-carrera',
  templateUrl: './carrera.component.html',
  styleUrls: ['./carrera.component.css']
})
export class CarreraComponent implements OnInit {
  carreras: Carrera[] = [];
  carrerasFiltradas: Carrera[] = [];
  searchText: string = '';

  // Configuración de paginación
  pageSize = 8;
  pageIndex = 0;
  pageSizeOptions = [4, 8, 12];

  constructor(private carreraService: CarreraService) {}

  ngOnInit(): void {
    this.cargarCarreras();
  }

  cargarCarreras(): void {
    this.carreraService.obtenerCarreras().subscribe(
      (data: Carrera[]) => {
        this.carreras = data;
        this.filtrarCarreras();
      },
      (error) => {
        console.error('Error al cargar las carreras:', error);
      }
    );
  }

  filtrarCarreras(): void {
    const filtered = this.carreras.filter((carrera) =>
      carrera.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
      carrera.descripcion.toLowerCase().includes(this.searchText.toLowerCase())
    );
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.carrerasFiltradas = filtered.slice(startIndex, endIndex);
  }

  cambiarPagina(event: any): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filtrarCarreras();
  }

  clearSearch(): void {
    this.searchText = '';
    this.filtrarCarreras();
  }
}
