import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categoriesSubscription: Subscription;
  categories: Category[];
  fetchingCategories: boolean = true;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.categoriesSubscription = this.categoriesService
    .getCategories()
    .subscribe((data: Category[]) => {
      this.categories = data;
      this.fetchingCategories = false;
    });
  }
  
  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }
}
