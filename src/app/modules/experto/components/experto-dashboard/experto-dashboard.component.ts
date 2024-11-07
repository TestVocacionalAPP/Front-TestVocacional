import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AsesoriaResponseDTO, AsesoriaService } from 'src/app/services/AsesoriaService';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-experto-dashboard',
  templateUrl: './experto-dashboard.component.html',
  styleUrls: ['./experto-dashboard.component.css']
})
export class ExpertoDashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<AsesoriaResponseDTO>();
  displayedColumns: string[] = ['indice', 'nombre', 'correo', 'asunto', 'fecha', 'estado', 'acciones'];

  constructor(private asesoriaService: AsesoriaService) {}

  ngOnInit(): void {
    this.cargarAsesorias();
  }

  cargarAsesorias(): void {
    this.asesoriaService.obtenerAsesoriasPorExperto().subscribe(
      (data: AsesoriaResponseDTO[]) => {
        this.dataSource.data = data;
        console.log('Asesorías cargadas:', data);
      },
      (error) => {
        console.error('Error al cargar asesorías:', error);
      }
    );
  }

  aceptarSolicitud(asesoria: AsesoriaResponseDTO): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea aceptar esta solicitud?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asesoriaService.aceptarAsesoria(asesoria.id).subscribe(
          (response) => {
            Swal.fire('Aceptada', 'La solicitud ha sido aceptada con éxito.', 'success');
            asesoria.estado = 'Aceptada'; // Actualiza el estado localmente
            this.cargarAsesorias(); // Recargar la lista para reflejar los cambios
          },
          (error) => {
            console.error('Error al aceptar la solicitud:', error);
            Swal.fire('Error', 'Hubo un problema al aceptar la solicitud.', 'error');
          }
        );
      }
    });
  }

  rechazarSolicitud(asesoria: AsesoriaResponseDTO): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: '¿Desea rechazar esta solicitud?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, rechazar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.asesoriaService.rechazarAsesoria(asesoria.id).subscribe(
          (response) => {
            Swal.fire('Rechazada', 'La solicitud ha sido rechazada con éxito.', 'success');
            asesoria.estado = 'Rechazada'; // Actualiza el estado localmente
            this.cargarAsesorias(); // Recargar la lista para reflejar los cambios
          },
          (error) => {
            console.error('Error al rechazar la solicitud:', error);
            Swal.fire('Error', 'Hubo un problema al rechazar la solicitud.', 'error');
          }
        );
      }
    });
  }

  // Método para verificar si los botones de aceptar y rechazar deben mostrarse
  puedeMostrarBotones(asesoria: AsesoriaResponseDTO): boolean {
    return asesoria.estado === 'PENDIENTE';
  }

  // Método para verificar si se debe mostrar el ícono de confirmada
  esConfirmada(asesoria: AsesoriaResponseDTO): boolean {
    return asesoria.estado === 'CONFIRMADA';
  }

  // Método para verificar si se debe mostrar el ícono de rechazada
  esRechazada(asesoria: AsesoriaResponseDTO): boolean {
    return asesoria.estado === 'RECHAZADA';
  }
}
