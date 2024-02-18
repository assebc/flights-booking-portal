import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./search-flights/search-flights.component').then(m => m.SearchFlightsComponent)
  }
];
