import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/veiculos/veiculos-list.component').then(
        (m) => m.VeiculosListComponent
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
