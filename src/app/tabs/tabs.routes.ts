import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'deluged',
    component: TabsPage,
    children: [
      {
        path: 'active',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'new',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: '',
        redirectTo: '/deluged/active',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/deluged/active',
    pathMatch: 'full',
  },
];
