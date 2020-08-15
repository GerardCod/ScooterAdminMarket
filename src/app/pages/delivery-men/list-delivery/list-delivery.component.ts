import { Component, OnInit } from '@angular/core';
import { AddDeliveryComponent } from '../add-delivery/add-delivery.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent implements OnInit {

  loadingDelivery: boolean;



  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  dialogAddDelivery() {
    const dialogRef = this.dialog.open(AddDeliveryComponent, {
      disableClose: true,
      // width: '600px',
      // height: '700px',
      data: { delivery: null }
    });
  }

}
