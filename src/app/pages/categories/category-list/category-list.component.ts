import { Component, OnInit, OnDestroy } from '@angular/core';
<<<<<<< HEAD
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
=======
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
>>>>>>> 3dd210a5ccfbecbb8f68b6aa54f534f94f4c4399
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

<<<<<<< HEAD
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
=======
  typeMenu;

  constructor(private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.typeMenu = localStorage.getItem('type_menu');
>>>>>>> 3dd210a5ccfbecbb8f68b6aa54f534f94f4c4399
  }


  openDialogAddcategory(category = null) {
<<<<<<< HEAD
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      disableClose: true,
      width: '500px',
      data: { category }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.dialog.closeAll();
      }
    });

=======
    if (this.typeMenu >= 2) {
      if (category != null) {
        this.router.navigate(['/categories/category', category.id]);
      } else {
        this.router.navigate(['/categories/category']);
      }
      return;
    } else {
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
>>>>>>> 3dd210a5ccfbecbb8f68b6aa54f534f94f4c4399
  }

}
