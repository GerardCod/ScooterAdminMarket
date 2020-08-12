import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  params;
  totalVehicles = 0;
  totalDelivery = 0;
  totalClient = 0;

  constructor() { }

  ngOnInit(): void {
  }

  

}
