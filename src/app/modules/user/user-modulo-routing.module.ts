import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { TestChasideComponent } from './components/test-chaside/test-chaside.component'; // Importa el componente
import { UserGuard } from 'src/app/guards/UserGuard';
import { AuthGuard } from 'src/app/guards/AuthGuard';
import { ResultadoTestComponent } from './components/resultado-test/resultado-test.component';
import { CarreraComponent } from './components/carrera/carrera.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ExpertosComponent } from './components/expertos/expertos.component';
import { HistorialComponent } from './components/historial/historial.component';
import { DetalleExpertoComponent } from './components/detalle-experto/detalle-experto.component';
import { RecursosEducativosComponent } from './components/recursos-educativos/recursos-educativos.component';
import { HistorialComprasComponent } from './components/historial-pagos/historial-pagos.component';


const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    canActivate: [UserGuard, AuthGuard],
  },
  {
    path: 'test-chaside',
    component: TestChasideComponent,
    canActivate: [UserGuard, AuthGuard],
  },
  {
    path: 'resultado-test/:idTest/:historialTestId',
    component: ResultadoTestComponent,
    canActivate: [UserGuard, AuthGuard],
  },
  {
    path: 'carrera',
    component: CarreraComponent,
    canActivate: [UserGuard, AuthGuard],
  },
  {
    path: 'profile',
    component: PerfilComponent,
    canActivate: [UserGuard, AuthGuard],
  },
  {
    path: 'ver',
    component: ExpertosComponent,
    canActivate: [UserGuard, AuthGuard],
  },
  {
    path: 'historial',
    component: HistorialComponent,
    canActivate: [UserGuard, AuthGuard],
  },
  {
    path: 'ver/detalle/:id',
    component: DetalleExpertoComponent,
    canActivate: [UserGuard, AuthGuard],
  },
  {
    path: 'recursos-educativos',
    component: RecursosEducativosComponent,
    canActivate: [UserGuard, AuthGuard],
  },
  {
    path: 'historial-pagos',
    component: HistorialComprasComponent,
    canActivate: [UserGuard, AuthGuard],
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserModuloRoutingModule {}
