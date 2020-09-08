import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openDialogAddcategory(category = null) {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      disableClose: true,
      width: '500px',
      data: { category }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        location.reload();
      }
    });
  }
}
