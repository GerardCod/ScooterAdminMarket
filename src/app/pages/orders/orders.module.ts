import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersCancelledComponent } from './orders-cancelled/orders-cancelled.component';
import { OrdersInProcessComponent } from './orders-in-process/orders-in-process.component';
import { OrdersRoutingModule } from './orders-routing.module';



@NgModule({
  declarations: [
    OrdersCancelledComponent,
    OrdersInProcessComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
export class OrdersModule { }
