import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Experto } from 'src/app/models/Experto';
import { ExpertoService } from 'src/app/services/ExpertoService';
import { SolicitudAsesoriaModalComponent } from '../../modales/solicitud-asesoria-modal/solicitud-asesoria-modal.component';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expertos',
  templateUrl: './expertos.component.html',
  styleUrls: ['./expertos.component.css']
})
export class ExpertosComponent implements OnInit {
  expertos: Experto[] = [];
  expertosFiltrados: Experto[] = [];
  pageIndex: number = 0;
  pageSize: number = 3;

  constructor(private expertoService: ExpertoService, private dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
    this.obtenerExpertos();
  }

  obtenerExpertos(): void {
    this.expertoService.obtenerTodosLosExpertos().subscribe(
      (data: Experto[]) => {
        this.expertos = data;
        this.expertosFiltrados = data; // Inicializa los expertos filtrados con todos los datos
      },
      (error) => {
        console.error('Error al obtener expertos:', error);
      }
    );
  }

  filtrarExpertos(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const valor = inputElement.value.toLowerCase();
      this.expertosFiltrados = this.expertos.filter(experto =>
        experto.nombre.toLowerCase().includes(valor) ||
        experto.apellido.toLowerCase().includes(valor) ||
        experto.especialidad.toLowerCase().includes(valor)
      );
      this.pageIndex = 0;
    }
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
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



  buscarPorEspecialidad(especialidad: string): void {
    this.expertoService.buscarPorEspecialidad(especialidad).subscribe(
      (data: Experto[]) => {
        this.expertosFiltrados = data;
        this.pageIndex = 0; // Reinicia la página al buscar
      },
      (error) => {
        console.error('Error al buscar por especialidad:', error);
      }
    );
  }
  verDetalles(experto: Experto): void {
    this.router.navigate(['/user/ver/detalle', experto.id]);

  }
}
