import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pago-recurso',
  templateUrl: './pago-recurso.component.html',
  styleUrls: ['./pago-recurso.component.css']
})
export class PagoRecursoComponent implements OnInit {
  numeroTarjeta: string = '';
  fechaVencimiento: string = '';
  cvv: string = '';
  tipoTarjeta: string = 'Visa';
  guardarTarjeta: boolean = false;
  tarjetaGuardada: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PagoRecursoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // Cargar tarjeta guardada, si existe
    const tarjetaGuardada = localStorage.getItem('tarjetaGuardada');
    if (tarjetaGuardada) {
      const tarjetaInfo = JSON.parse(tarjetaGuardada);
      this.numeroTarjeta = tarjetaInfo.numeroTarjeta;
      this.fechaVencimiento = tarjetaInfo.fechaVencimiento;
      this.cvv = tarjetaInfo.cvv;
      this.tipoTarjeta = tarjetaInfo.tipoTarjeta;
      this.tarjetaGuardada = true; // Indicar que hay una tarjeta guardada
    }
  }

  realizarCompra() {
    if (this.numeroTarjeta.length >= 4) {
      // Guardar tarjeta si el usuario selecciona la opción
      if (this.guardarTarjeta) {
        const tarjetaInfo = {
          numeroTarjeta: this.numeroTarjeta,
          fechaVencimiento: this.fechaVencimiento,
          cvv: this.cvv,
          tipoTarjeta: this.tipoTarjeta
        };
        localStorage.setItem('tarjetaGuardada', JSON.stringify(tarjetaInfo));
        this.tarjetaGuardada = true;
      }

      // Cerrar diálogo y enviar datos de la tarjeta
      this.dialogRef.close({
        success: true,
        numeroTarjeta: this.numeroTarjeta,
        tipoTarjeta: this.tipoTarjeta
      });
    } else {
      alert('Número de tarjeta inválido. Asegúrate de ingresar todos los datos requeridos.');
    }
  }

  eliminarTarjetaGuardada(): void {
    localStorage.removeItem('tarjetaGuardada');
    this.numeroTarjeta = '';
    this.fechaVencimiento = '';
    this.cvv = '';
    this.tipoTarjeta = 'Visa';
    this.tarjetaGuardada = false; // Indicar que ya no hay tarjeta guardada
    alert('Los datos de la tarjeta han sido eliminados.');
  }

  close(): void {
    this.dialogRef.close({ success: false });
  }
}
