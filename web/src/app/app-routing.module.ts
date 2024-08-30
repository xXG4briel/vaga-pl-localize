import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/public/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/public/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'bills/:customerId',
    loadChildren: () => import('./pages/private/bills/bills.module').then( m => m.BillsPageModule)
  },
  {
    path: 'bills/:customerId/:id',
    loadChildren: () => import('./pages/private/bills/bills.module').then( m => m.BillsPageModule)
  },
  {
    path: 'customers',
    loadChildren: () => import('./pages/private/customers/customers.module').then( m => m.CustomersPageModule)
  },
  {
    path: 'customers/:id',
    loadChildren: () => import('./pages/private/customers/customers.module').then( m => m.CustomersPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
