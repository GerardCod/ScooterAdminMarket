import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  builder: FormBuilder = new FormBuilder();
  group: FormGroup;
  imageURL: string;
  categories: Category[];
  storeDataSubscription: Subscription;
  categoriesSubscription: Subscription;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.categoriesSubscription = this.categoriesService
    .getCategories({}, 1)
    .subscribe((data: any) => {
      this.categories = data.results;
    });
  }

  ngOnDestroy(): void {
    if (this.storeDataSubscription) {
      this.storeDataSubscription.unsubscribe();
    }
    this.categoriesSubscription.unsubscribe();
  }

  buildForm(): void {
    this.group = this.builder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      description_long: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]]
    });
  }

  handlePickUpImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageURL = String(reader.result);
    }
  }

  sendData(product: Product) {
    if (this.imageURL) {
      product.picture = this.imageURL;
    }
    this.saveProduct(product);
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

  saveProduct(product: Product) {
    this.storeDataSubscription = this.productsService.addProduct(product)
    .subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/products']);
    });
  }
}
