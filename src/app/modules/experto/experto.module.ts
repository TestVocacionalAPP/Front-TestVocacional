import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertoRoutingModule } from './experto-routing.module';
import { ExpertoDashboardComponent } from './components/experto-dashboard/experto-dashboard.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { PerfilExpertoComponent } from './components/perfil-experto/perfil-experto.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    ExpertoDashboardComponent,
    PerfilExpertoComponent,


  ],
  imports: [
    CommonModule,
    ExpertoRoutingModule,
    MatTableModule,
    MatSortModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})

export class ExpertoModule { }
