import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import { MatDialog } from '@angular/material/dialog';
import { WebSocketService } from 'ScooterAdminMarket/src/app/services/web-socket.service';
import { CancelOrderComponent } from '../orders-in-process/cancel-order/cancel-order.component';
import { ProfileService } from 'ScooterAdminMarket/src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  idOrder: number;
  params = {};
  orderDetail;
  stationDetail;


  constructor(
    private ordersService: OrdersService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private route: Router) {
    this.idOrder = activatedRoute.snapshot.params.id;
    console.log('El id obtenido es', this.idOrder);

  }

  ngOnInit(): void {
    this.getOrderId();
    this.getProfileId();
  }


  getOrderId() {
    this.ordersService.getOrdersId(this.idOrder)
      .subscribe((data: any) => {
        this.orderDetail = data;
        console.log('Order', this.orderDetail);
      }, error => {
        console.log(error, 'No paso nada ');
      });
  }

  getProfileId() {
    this.profileService.getStation()
      .subscribe((data: any) => {
        this.stationDetail = data;
        console.log('Order', this.stationDetail);
      }, error => {
        console.log(error, 'No paso nada ');
      });
  }
}
