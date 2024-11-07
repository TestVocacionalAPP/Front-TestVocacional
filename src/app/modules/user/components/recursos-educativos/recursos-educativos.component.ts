import { Component, OnInit } from '@angular/core';
import { RecursoResponseDTO, RecursoService } from 'src/app/services/RecursoService';
import { PagoRecursoComponent } from '../pago-recurso/pago-recurso.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-recursos-educativos',
  templateUrl: './recursos-educativos.component.html',
  styleUrls: ['./recursos-educativos.component.css']
})
export class RecursosEducativosComponent implements OnInit {
  recursos: RecursoResponseDTO[] = [];
  recursosFiltrados: RecursoResponseDTO[] = [];
  searchText: string = '';

  // Configuración de paginación
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [6, 12, 18];

  constructor(private recursoService: RecursoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.listarRecursos();
    this.buscarRecursos();
  }

  listarRecursos(): void {
    this.recursoService.listarRecursos().subscribe({
      next: (recursos) => {
        this.recursos = recursos;
        this.actualizarEstadoRecursos();
        this.filtrarRecursos();
      },
      error: (error) => console.error('Error al listar recursos:', error),
    });
  }

  buscarRecursos(): void {
    if (this.searchText) {
      this.recursoService.buscarRecursosPorTitulo(this.searchText).subscribe({
        next: (recursos) => {
          this.recursosFiltrados = recursos;
        },
        error: (error) => console.error('Error al buscar recursos:', error),
      });
    } else {
      // Si la búsqueda está vacía, listar todos los recursos
      this.listarRecursos();
    }
  }

  actualizarEstadoRecursos(): void {
    this.recursoService.listarRecursos().subscribe({
      next: (actualizados) => {
        this.recursos.forEach((recurso) => {
          const recursoActualizado = actualizados.find(r => r.id === recurso.id);
          if (recursoActualizado) {
            recurso.tieneAcceso = recursoActualizado.tieneAcceso;
          }
        });
        this.filtrarRecursos();
      },
      error: (error) => console.error('Error al actualizar el estado de los recursos:', error),
    });
  }

  filtrarRecursos(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.recursosFiltrados = this.recursos.slice(startIndex, endIndex);
  }

  cambiarPagina(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.filtrarRecursos();
  }

  getYoutubeThumbnail(url: string): string | null {
    const videoId = this.extractYoutubeVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/0.jpg` : null;
  }

  private extractYoutubeVideoId(url: string): string | null {
    const regex = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  openVideoInNewTab(url: string): void {
    window.open(url, '_blank');
  }

  comprarRecurso(recurso: RecursoResponseDTO): void {
    const tarjetaGuardada = localStorage.getItem('tarjetaGuardada');
    let dialogRef;

    if (tarjetaGuardada) {
      const tarjetaInfo = JSON.parse(tarjetaGuardada);
      dialogRef = this.dialog.open(PagoRecursoComponent, {
        width: '400px',
        data: { recurso, tarjetaInfo }
      });
    } else {
      dialogRef = this.dialog.open(PagoRecursoComponent, {
        width: '400px',
        data: { recurso }
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.success) {
        this.recursoService.comprarRecurso(recurso.id, {
          numeroTarjeta: result.numeroTarjeta,
          tipoTarjeta: result.tipoTarjeta
        }).subscribe({
          next: () => {
            recurso.tieneAcceso = true;
            alert('Compra realizada con éxito. Ahora tienes acceso al recurso.');
            this.actualizarEstadoRecursos();
          },
          error: (error) => console.error('Error al comprar el recurso:', error)
        });
      } else {
        alert('Compra cancelada.');
      }
    });
  }
}
