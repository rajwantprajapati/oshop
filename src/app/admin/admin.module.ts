import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { DataTableModule } from 'angular5-data-table';
import { AuthGaurd } from 'shared/services/auth-gaurd.service';

import { SharedModule } from './../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AdminAuthGaurd } from './services/admin-auth-gaurd.service';

const appRoutes: Route[] = [
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGaurd, AdminAuthGaurd]
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGaurd, AdminAuthGaurd]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGaurd, AdminAuthGaurd]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGaurd, AdminAuthGaurd]
  }
];

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(appRoutes)
  ]
})
export class AdminModule { }
