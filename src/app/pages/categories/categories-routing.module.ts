import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryListComponent } from './category-list/category-list.component';
import { InfoCategoryComponent } from './info-category/info-category.component';

const routes: Routes = [
  { path: '', component: CategoryListComponent },
  { path: '/category/:id', component: InfoCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
