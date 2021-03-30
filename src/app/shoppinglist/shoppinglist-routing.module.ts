import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

import { ShoppinglistCreateComponent } from './create-component/shoppinglist-create.component';
import { ShoppinglistDashboardComponent } from './dashboard-component/shoppinglist-dashboard.component';
import { ShoppinglistDetailsComponent } from './details-component/shoppinglist-details.component';

const routes: Routes = [
  { path: 'create', canActivateChild: [AuthGuard], component: ShoppinglistCreateComponent, data: { isLogged: true, title: 'Create'} },
  { path: 'dashboard', canActivateChild: [AuthGuard], component: ShoppinglistDashboardComponent, data: { isLogged: true, title: 'Dashboard'} },
  { path: ':id', component: ShoppinglistDetailsComponent, data: { title: 'Details'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppinglistRoutingModule { }
