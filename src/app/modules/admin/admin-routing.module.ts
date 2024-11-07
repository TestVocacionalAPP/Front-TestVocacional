import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/AuthGuard';
import { AdminGuard } from 'src/app/guards/AdminGuard';
import { AdminDashComponent } from './components/admin-dash/admin-dash.component';
import { RegistroTestComponent } from './components/registro-test/registro-test.component';
import { CrearExpertoComponent } from './components/registro-experto/registro-experto.component';
import { ExpertoListComponent } from './components/experto-list/experto-list.component';
import { CrearRecursoComponent } from './components/crear-recurso/crear-recurso.component';
import { RecursoListComponent } from './components/recurso-list/recurso-list.component';

const routes: Routes = [

  {
    path: '',
    component: AdminDashComponent,
    canActivate: [AdminGuard, AuthGuard],
    children: [
      {
        path: 'registroTest',
        component: RegistroTestComponent,
        canActivate: [AdminGuard, AuthGuard],
      },
      {
        path: 'crear-experto',
        component: ExpertoListComponent,
        canActivate: [AdminGuard, AuthGuard],
      },
      {
        path: 'recurso-educativo',
        component: RecursoListComponent,
        canActivate: [AdminGuard, AuthGuard],
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
