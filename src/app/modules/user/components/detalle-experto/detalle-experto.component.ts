import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertoService } from 'src/app/services/ExpertoService';
import { ComentarioService } from 'src/app/services/comentario-service.service';
import { AuthService } from 'src/app/services/auth.service';
import { Experto } from 'src/app/models/Experto';
import { Location } from '@angular/common';
import { SolicitudAsesoriaModalComponent } from '../../modales/solicitud-asesoria-modal/solicitud-asesoria-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
interface Comentario {
  id: number;
  contenido: string;
  fecha: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  esUsuarioAutenticado?: boolean;
  usuarioId: number;
}

@Component({
  selector: 'app-detalle-experto',
  templateUrl: './detalle-experto.component.html',
  styleUrls: ['./detalle-experto.component.css'],
})
export class DetalleExpertoComponent implements OnInit {
  experto: Experto | null = null;
  comentarios: Comentario[] = [];
  nuevoComentario: string = '';
  usuarioIdAutenticado: number | null = null;
  isLiked: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private expertoService: ExpertoService,
    private comentarioService: ComentarioService,
    private authService: AuthService,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.usuarioIdAutenticado = this.authService.getUsuarioId();

    if (id) {
      this.expertoService.obtenerExpertoPorId(+id).subscribe(
        (data: Experto) => {
          this.experto = data;
          this.obtenerComentarios(+id);
        },
        (error) => {
          console.error('Error al cargar los detalles del experto:', error);
        }
      );
    }
  }

  obtenerComentarios(expertoId: number): void {
    this.comentarioService.listarComentariosPorExperto(expertoId).subscribe(
      (data: Comentario[]) => {
        this.comentarios = data.map((comentario) => {
          let contenidoLimpio = comentario.contenido;

          try {
            const parsedContent = JSON.parse(comentario.contenido);
            if (parsedContent && parsedContent.contenido) {
              contenidoLimpio = parsedContent.contenido;
            }
          } catch (e) {
            // Mantén el contenido si no es JSON
          }

          return {
            ...comentario,
            contenido: contenidoLimpio,
            esUsuarioAutenticado:
              comentario.usuarioId === this.usuarioIdAutenticado,
          };
        });
      },
      (error) => {
        console.error('Error al obtener comentarios:', error);
      }
    );
  }

  agregarComentario(): void {
    if (this.nuevoComentario.trim() && this.experto) {
      this.comentarioService
        .agregarComentario(this.experto.id, this.nuevoComentario.trim())
        .subscribe(
          () => {
            this.obtenerComentarios(this.experto!.id);
            this.nuevoComentario = '';
          },
          (error) => {
            console.error('Error al agregar el comentario:', error);
          }
        );
    }
  }

  editarComentario(comentario: Comentario): void {
    const nuevoContenido = prompt('Editar comentario:', comentario.contenido);
    if (nuevoContenido !== null && nuevoContenido.trim()) {
      this.comentarioService
        .editarComentario(comentario.id, nuevoContenido)
        .subscribe(
          () => {
            this.obtenerComentarios(this.experto!.id);
          },
          (error) => {
            console.error('Error al editar el comentario:', error);
          }
        );
    }
  }

  eliminarComentario(comentarioId: number): void {
    if (confirm('¿Estás seguro de eliminar este comentario?')) {
      this.comentarioService.eliminarComentario(comentarioId).subscribe(
        () => {
          this.obtenerComentarios(this.experto!.id);
        },
        (error) => {
          console.error('Error al eliminar el comentario:', error);
        }
      );
    }
  }

  incrementarLikes(): void {
    if (this.experto) {
      this.expertoService.toggleLike(this.experto.id).subscribe(
        (data: Experto) => {
          this.experto!.likes = data.likes;
          this.isLiked = !this.isLiked; // Cambia el estado visual del "like"
        },
        (error) => {
          console.error('Error al togglear like:', error);
        }
      );
    }
  }
  goBack(): void {
    this.location.back();
  }

  contactarExperto(experto: Experto): void {
    const dialogRef = this.dialog.open(SolicitudAsesoriaModalComponent, {
      width: '500px',
      data: { expertoId: experto.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Mostrar mensaje de éxito al enviar la solicitud
        Swal.fire({
          title: 'Solicitud Enviada',
          text: 'Tu solicitud de asesoría fue enviada con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
      } else {
        console.log('Solicitud cancelada');
      }
    });
  }


formatImageUrl(imageUrl: string | null): string {
  return imageUrl ? `data:image/jpeg;base64,${imageUrl}` : 'assets/default-image.png';
}

}
