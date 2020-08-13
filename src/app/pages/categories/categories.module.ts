import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CardInfoComponent } from './info-category/card-info/card-info.component';
import { ProductListComponent } from './info-category/product-list/product-list.component';
import { InfoCategoryComponent } from './info-category/info-category.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CategoryListComponent, CardInfoComponent, ProductListComponent, InfoCategoryComponent, AddCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CategoriesModule { }
