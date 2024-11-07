import { Component, OnInit } from '@angular/core';
import { CompraResponseDTO, RecursoService } from 'src/app/services/RecursoService';

@Component({
  selector: 'app-historial-pagos',
  templateUrl: './historial-pagos.component.html',
  styleUrls: ['./historial-pagos.component.css']
})
export class HistorialComprasComponent implements OnInit {
  historialCompras: CompraResponseDTO[] = [];

  constructor(private recursoService: RecursoService) {}

  ngOnInit(): void {
    this.cargarHistorialCompras();
  }

  cargarHistorialCompras(): void {
    this.recursoService.obtenerHistorialCompras().subscribe(
      (data: CompraResponseDTO[]) => {
        this.historialCompras = data;
      },
      (error) => {
        console.error('Error al cargar el historial de compras:', error);
      }
    );
  }
}
