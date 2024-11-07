import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GlobalRoutingModule } from './global-routing.module';
import { NavbardExpertoComponent } from './components/navbard-experto/navbard-experto.component';
import { NavbardAdminComponent } from './components/navbard-admin/navbard-admin.component';
import { NavbardComponent } from './components/navbard/navbard.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    NavbardComponent,
    NavbardAdminComponent,
    NavbardExpertoComponent,
    LoginComponent,
    GlobalRoutingModule
  ],
  declarations: [
    LoginComponent,
    NavbardComponent,
    NavbardAdminComponent,
    NavbardExpertoComponent,
  ],
})
export class GlobalModule {}

