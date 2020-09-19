import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { OrdersService } from 'src/app/services/orders.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
=======
import { OrdersService } from '../../../services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../../../services/profile.service';
>>>>>>> 52d2357f8ed63fa36c5ee9a69dbceb0244e8c2a3

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  idOrder: number;
  params = {};
  orderDetail;
<<<<<<< HEAD


  constructor(
    private ordersService: OrdersService,
    private profileService: ProfileService,
    private activatedRoute: ActivatedRoute,
    private route: Router) {
=======
  stationDetail;


  constructor(private ordersService: OrdersService, private profileService: ProfileService,
    private activatedRoute: ActivatedRoute, private route: Router) {
>>>>>>> 52d2357f8ed63fa36c5ee9a69dbceb0244e8c2a3
    this.idOrder = activatedRoute.snapshot.params.id;
    console.log('El id obtenido es', this.idOrder);

  }

  ngOnInit(): void {
    this.getOrderId();
<<<<<<< HEAD
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
=======
    this.getStation();
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

  getStation() {
    this.profileService.getStation()
      .subscribe((data: any) => {
        this.stationDetail = data;
        console.log('Station', this.stationDetail);
      }, error => {
        console.log(error);
        return;
      });
  }



>>>>>>> 52d2357f8ed63fa36c5ee9a69dbceb0244e8c2a3
}
