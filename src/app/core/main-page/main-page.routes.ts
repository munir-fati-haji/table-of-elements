import { ElementsComponent } from '../../modules/elements/elements.component';
import { Routes } from '@angular/router';
import { ElementsAgGridComponent } from '../../modules/elements-ag-grid/elements-ag-grid.component';

export const mainPageRoutes: Routes = [
  { path: 'elements', component: ElementsComponent },
  { path: 'elements-ag-grid', component: ElementsAgGridComponent },
];
