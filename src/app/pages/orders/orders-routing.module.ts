import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersInProcessComponent } from './orders-in-process/orders-in-process.component';
import { OrdersCancelledComponent } from './orders-cancelled/orders-cancelled.component';

const routes: Routes = [
    { path: 'process', component: OrdersInProcessComponent },
    { path: 'cancelled', component: OrdersCancelledComponent },


];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class OrdersRoutingModule { }
