import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './guards/UserGuard';
import { AuthGuard } from './guards/AuthGuard';
import { ExpertoGuard } from './guards/ExpertoGuard';
import { AdminGuard } from './guards/AdminGuard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/global/global.module').then((m) => m.GlobalModule),
  },

  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
      canActivate: [UserGuard,AuthGuard]
  },
  {
    path: 'experto',
    loadChildren: () =>
      import('./modules/experto/experto.module').then((m) => m.ExpertoModule),
      canActivate: [ExpertoGuard,AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
      canActivate: [AdminGuard,AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
