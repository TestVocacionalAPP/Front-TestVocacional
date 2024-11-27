import { Component, OnInit } from '@angular/core';
import { CompraResponseDTO, RecursoService } from 'src/app/services/RecursoService';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.css']
})
export class HistorialComprasComponent implements OnInit {
  historialCompras: CompraResponseDTO[] = [];
  loading: boolean = true;

  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.cargarHistorialCompras();
  }

  cargarHistorialCompras(): void {
    this.recursoService.obtenerHistorialCompras().subscribe(
      (data: CompraResponseDTO[]) => {
        this.historialCompras = data;
        this.loading = false;  // Ocultar el spinner cuando los datos estén cargados
      },
      (error) => {
        console.error('Error al cargar el historial de compras:', error);
        this.loading = false;  // También ocultamos el spinner si ocurre un error
      }
    );
  }
}
