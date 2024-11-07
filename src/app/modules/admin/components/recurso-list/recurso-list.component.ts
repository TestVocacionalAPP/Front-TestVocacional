import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecursoResponseDTO, RecursoService } from 'src/app/services/RecursoService';
import { CrearRecursoComponent } from '../crear-recurso/crear-recurso.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recurso-list',
  templateUrl: './recurso-list.component.html',
  styleUrls: ['./recurso-list.component.css']
})
export class RecursoListComponent implements OnInit {
  recursos: RecursoResponseDTO[] = [];
  recursosFiltrados: RecursoResponseDTO[] = [];
  searchText: string = '';

  constructor(private recursoService: RecursoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.listarRecursos();
  }

  listarRecursos(): void {
    this.recursoService.listarRecursos().subscribe({
      next: (recursos) => {
        this.recursos = recursos;
        this.recursosFiltrados = recursos; // Inicialmente, muestra todos los recursos
      },
      error: (error) => console.error('Error al listar recursos:', error),
    });
  }

  filtrarRecursos(): void {
    const filtro = this.searchText.toLowerCase();
    this.recursosFiltrados = this.recursos.filter(recurso =>
      recurso.titulo.toLowerCase().includes(filtro) ||
      recurso.descripcion.toLowerCase().includes(filtro) ||
      recurso.tipoRecurso.toLowerCase().includes(filtro)
    );
  }

  openCrearRecursoDialog(): void {
    const dialogRef = this.dialog.open(CrearRecursoComponent, { width: '600px' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarRecursos();
      }
    });
  }

  openEditarRecursoDialog(recurso: RecursoResponseDTO): void {
    const dialogRef = this.dialog.open(CrearRecursoComponent, {
      width: '600px',
      data: recurso,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.listarRecursos();
      }
    });
  }

  eliminarRecurso(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.recursoService.eliminarRecurso(id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', 'El recurso ha sido eliminado.', 'success');
            this.listarRecursos();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar el recurso', 'error'),
        });
      }
    });
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
}
