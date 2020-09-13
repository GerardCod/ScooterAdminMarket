import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories.service';
import { AddSectionDialogComponent } from './add-section-dialog/add-section-dialog.component';
import { AddSubcategoryDialogComponent } from './add-subcategory-dialog/add-subcategory-dialog.component';

@Component({
  selector: 'app-add-category-page',
  templateUrl: './add-category-page.component.html',
  styleUrls: ['./add-category-page.component.scss']
})
export class AddCategoryPageComponent implements OnInit {

  group: FormGroup;
  subcatoryList = [];
  subcategorySelectedId;
  sectionsCurrentList;
  loadingSaveData;

  constructor(private fb: FormBuilder,
              private dialog: MatDialog,
              private router: Router,
              private snackbar: MatSnackBar,
              private categoriesService: CategoriesService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm() {
    this.group = this.fb.group({
      name: [null, Validators.required]
    });
  }

  openDialogSubcategory() {
    const dialogRef = this.dialog.open(AddSubcategoryDialogComponent, {
      disableClose: true,
      minWidth: '400px',
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        data.sections = [];
        this.subcatoryList.push(data);
      }
    });
  }

  openDialogSection() {
    const dialogRef = this.dialog.open(AddSectionDialogComponent, {
      disableClose: true,
      minWidth: '400px',
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
        this.subcatoryList[this.subcategorySelectedId].sections.push(data);
      }
    });
  }

  saveData() {
    if (this.group.invalid) {
      this.group.markAllAsTouched();
      return;
    }
    if (!this.validSubcategories()) {
      return;
    }
    const category = this.group.value;
    category.subcategories = this.subcatoryList;
    this.loadingSaveData = true;

    this.categoriesService.addCategory(category)
    .subscribe((data: any) => {
      this.loadingSaveData = false;
      this.snackbar.open('Categoría agregada correctamente', '', {
        duration: 3000
      });
      this.router.navigate(['/categories'])
    }, error => {
      alert(error.errors.message);
      this.loadingSaveData = false;
    });


  }

  validSubcategories(): boolean {
    let isValid = true;
    if (this.subcatoryList.length == 0) {
      this.snackbar.open(`Agrega al menos una subcategoria`, '', {
        duration: 4000
      });
      return false;
    }

    for (const subcategory of this.subcatoryList) {
      if (subcategory.sections.length == 0) {
        isValid = false;
        this.snackbar.open(`La subcategoría ${subcategory.name} debe de tener al menos una sección`, '', {
          duration: 4000
        });
        break;
      }
    }

    return isValid;
  }

  selectSubcategory(value) {
    this.subcategorySelectedId = value.option.value;
    console.log(this.subcategorySelectedId);
  }

  isFieldInvalid(field: string): boolean {
    return (this.group.get(field).invalid && this.group.get(field).touched);
  }

  isFieldValid(field: string): boolean {
    return (this.group.get(field).valid && this.group.get(field).touched);
  }

  hasFieldError(field: string, errorcode: string): boolean {
    return (this.group.get(field).hasError(errorcode));
  }

}
