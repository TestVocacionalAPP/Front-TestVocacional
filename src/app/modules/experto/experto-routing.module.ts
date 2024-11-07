import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ExpertoDashboardComponent } from './components/experto-dashboard/experto-dashboard.component';
import { AuthGuard } from 'src/app/guards/AuthGuard';
import { ExpertoGuard } from 'src/app/guards/ExpertoGuard';
import { PerfilExpertoComponent } from './components/perfil-experto/perfil-experto.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertoDashboardComponent,
    canActivate: [AuthGuard, ExpertoGuard],
  },
  {
    path: 'perfil-experto',
    component: PerfilExpertoComponent,
    canActivate: [AuthGuard, ExpertoGuard],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpertoRoutingModule {}
