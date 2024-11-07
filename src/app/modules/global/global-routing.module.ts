import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { NavbardExpertoComponent } from './components/navbard-experto/navbard-experto.component';
import { NavbardAdminComponent } from './components/navbard-admin/navbard-admin.component';
import { NavbardComponent } from './components/navbard/navbard.component';

export const globalRoutes: Routes = [
  {
    path: '',
    component: NavbardComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'experto',
    component: NavbardExpertoComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../experto/experto.module').then((m) => m.ExpertoModule),
      },
    ],
  },
  {
    path: 'admin',
    component: NavbardAdminComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(globalRoutes)],
  exports: [RouterModule],
})
export class GlobalRoutingModule {}
