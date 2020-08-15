import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  categories: Category[];
  productsSubscription: Subscription;

   // MatPaginator Inputs
   length = 100;
   pageSize = 25;
   pageSizeOptions: number[] = [25, 50, 75, 100];
   // MatPaginator Output
   pageEvent: PageEvent;

   params = {
    limit: 1,
    offset: 0,
    search: '',
    ordering: '',
    status: 1
  }

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts(this.params);
   
  }

  ngOnDestroy(): void {
    this.productsSubscription.unsubscribe();
  }

  searchBy(search: string): void {
    this.params.search = search;
    this.getProducts(this.params);
  }

  orderBy(orderValue: string): void {
    this.params.ordering = orderValue;
    this.getProducts(this.params);
  }

  getProducts(params = {}): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
    this.productsSubscription = this.productService.getProducts(params)
    .subscribe((data: any) => {
      this.products = data.results;
    });
  }

  getPage(e: any): PageEvent {
    if (this.products.length === 0) {
      this.pageSize = 25;
      return;
    }

    this.params.limit = e.pageSize;
    this.params.offset = this.params.limit * e.pageIndex;
    this.getProducts(this.params);
  }
}
