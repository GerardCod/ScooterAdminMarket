import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CardInfoComponent } from './info-category/card-info/card-info.component';
import { ProductListComponent } from './info-category/product-list/product-list.component';
import { InfoCategoryComponent } from './info-category/info-category.component';


@NgModule({
  declarations: [CategoryListComponent, CardInfoComponent, ProductListComponent, InfoCategoryComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule
  ]
})
export class CategoriesModule { }
