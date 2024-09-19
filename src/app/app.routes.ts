import { Routes } from '@angular/router';
import { MainPageComponent } from './core/main-page/main-page.component';
import { mainPageRoutes } from './core/main-page/main-page.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'elements',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainPageComponent,
    children: mainPageRoutes,
  },
];
