import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EnabledComponent } from './category-list/enabled/enabled.component';
import { DisabledComponent } from './category-list/disabled/disabled.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    AddCategoryComponent,
    EnabledComponent,
    DisabledComponent],

  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class CategoriesModule { }
