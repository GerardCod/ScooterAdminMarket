import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/guards/auth.guard';
import { RefreshTokenGuard } from '../services/guards/refresh-token.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'orders',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
  },
  {
    path: 'delivery',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./delivery-men/delivery-men.module').then(m => m.DeliveryMenModule)
  },
  {
    path: 'profile',
    canActivate: [AuthGuard, RefreshTokenGuard],
    loadChildren: () => import('./view-profile/view-profile.module').then(m => m.ViewProfileModule)
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'categories',
<<<<<<< HEAD
=======
    canActivate: [AuthGuard, RefreshTokenGuard],
>>>>>>> 3dd210a5ccfbecbb8f68b6aa54f534f94f4c4399
    loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'products',
<<<<<<< HEAD
=======
    canActivate: [AuthGuard, RefreshTokenGuard],
>>>>>>> 3dd210a5ccfbecbb8f68b6aa54f534f94f4c4399
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
