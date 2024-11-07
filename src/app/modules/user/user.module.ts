import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModuloRoutingModule } from './user-modulo-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TestChasideComponent } from './components/test-chaside/test-chaside.component';
import { ResultadoTestComponent } from './components/resultado-test/resultado-test.component';
import { CarreraComponent } from './components/carrera/carrera.component';
import { MatIconModule } from '@angular/material/icon';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FilterPipe } from 'src/app/pipes/FilterPipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ExpertosComponent } from './components/expertos/expertos.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SolicitudAsesoriaModalComponent } from './modales/solicitud-asesoria-modal/solicitud-asesoria-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { HistorialComponent } from './components/historial/historial.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DetalleExpertoComponent } from './components/detalle-experto/detalle-experto.component';
import { RecursosEducativosComponent } from './components/recursos-educativos/recursos-educativos.component';
import { PagoRecursoComponent } from './components/pago-recurso/pago-recurso.component';
import { InputMaskDirective } from 'src/app/directiva/InputMaskDirective';
import { HistorialComprasComponent } from './components/historial-pagos/historial-pagos.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    UserDashboardComponent,
    TestChasideComponent,
    ResultadoTestComponent,
    CarreraComponent,
    FilterPipe,
    PerfilComponent,
    ExpertosComponent,
    SolicitudAsesoriaModalComponent,
    HistorialComponent,
    DetalleExpertoComponent,
    RecursosEducativosComponent,
    PagoRecursoComponent,
    InputMaskDirective,
    HistorialComprasComponent
  ],
  imports: [
    CommonModule,
    UserModuloRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatToolbarModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatChipsModule
  ],

})
export class UserModule { }
