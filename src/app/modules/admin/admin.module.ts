import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroTestComponent } from './components/registro-test/registro-test.component';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CrearExpertoComponent } from './components/registro-experto/registro-experto.component';
import { ExpertoListComponent } from './components/experto-list/experto-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CrearRecursoComponent } from './components/crear-recurso/crear-recurso.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { RecursoListComponent } from './components/recurso-list/recurso-list.component';
import { MatTableModule } from '@angular/material/table';
import { SafeUrlPipe } from 'src/app/pipes/SafeUrlPipe';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AdminDashComponent,
    RegistroTestComponent,
    CrearExpertoComponent,
    ExpertoListComponent,
    CrearRecursoComponent,
    RecursoListComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatCardModule
  ],
  exports: [SafeUrlPipe]
})
export class AdminModule {}
