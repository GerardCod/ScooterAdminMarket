import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categoriesSubscription: Subscription;
  categories: Category[];

  params = {
    limit: 15,
    offset: 0,
    search: '',
    ordering: ''
  }

   // MatPaginator Inputs
   length = 100;
   pageSize = 25;
   pageSizeOptions: number[] = [25, 50, 75, 100];
   // MatPaginator Output
   pageEvent: PageEvent;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories(this.params);
  }
  
  ngOnDestroy(): void {
    this.categoriesSubscription.unsubscribe();
  }

  getCategories(params = {}): void {
    this.categoriesSubscription = this.categoriesService
    .getCategories(params)
    .subscribe((data: any) => {
      this.categories = data.results;
      this.length = data.count;
    });
  }

  searchBy(search: string): void {
    this.params.search = search;
    this.getCategories(this.params.search);
  }

  orderBy(orderValue: string): void {
    this.params.ordering = orderValue;
    this.getCategories(this.params.ordering);
  }

  getPage(e: any): PageEvent {
    if (this.categories.length === 0) {
      this.pageSize = 25;
      return;
    }

    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getCategories(this.params);
  }
}
