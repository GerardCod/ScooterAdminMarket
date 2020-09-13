import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { MatDialog } from '@angular/material/dialog';
import { MunuCategoryDialogComponent } from './munu-category-dialog/munu-category-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {
  builder: FormBuilder = new FormBuilder();
  group: FormGroup;
  imageURL: string;
  id: number;
  categories: Category[];
  categorySelected;
  subcategorySelected;
  storeDataSubscription: Subscription;
  categoriesSubscription: Subscription;
  productSubscription: Subscription;
  panelOpenState = false;
  loadingSave = false;
  menus = []
  typeMenu;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snack: MatSnackBar
  ) {
    this.typeMenu = localStorage.getItem('type_menu');
    if (this.typeMenu == 3) {
      this.buildFormMenuThree();
    } else {
      this.buildForm();
    }
    this.id = this.route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.categoriesService
      .getCategories({ status: 1 })
      .subscribe((data: any) => {
        this.categories = data.results;
      });
    if (this.id) {
      this.productSubscription = this.productsService.getProductById(this.id)
        .subscribe((data: Product) => {
          this.setFormData(data);
        });
    }
  }

  ngOnDestroy(): void {
    if (this.storeDataSubscription) {
      this.storeDataSubscription.unsubscribe();
    }

    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }

    this.categoriesSubscription.unsubscribe();
  }

  buildForm(): void {
    this.group = this.builder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stock: [100],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]]
    });
  }

  buildFormMenuThree() {
    this.group = this.builder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      stock: [100],
      price: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      subcategory_id: ['', [Validators.required]],
      section_id: ['', [Validators.required]],
    });
  }

  selectCategory(categoryId) {
    this.categorySelected = this.categories.find(category => category.id == categoryId );
  }

  selectSubcategory(subcategoryId) {
    this.subcategorySelected = this.categorySelected.subcategories.find(subcategory => subcategory.id == subcategoryId );
    console.log(this.subcategorySelected);
  }

  setFormData({ name, description, category_id, stock, price, picture }: Product): void {
    this.group.get('name').setValue(name);
    this.group.get('description').setValue(description);
    this.group.get('category_id').setValue(category_id);
    this.group.get('stock').setValue(stock);
    this.group.get('price').setValue(price);
    this.imageURL = picture;
  }

  handlePickUpImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageURL = String(reader.result);
    }
  }

  sendData(product: Product): void {
    if (this.group.invalid) {
      this.group.markAllAsTouched();
      return;
    }
    if (!/'https'/.test(this.imageURL)) {
      product.picture = this.imageURL;
    } else {
      delete product.picture;
    }

    if (this.id) {
      product.id = this.id;
      this.updateProduct(product);
    } else {
      this.saveProduct(product);
    }
  }

  openMenuDialog() {
    const dialogRef = this.dialog.open(MunuCategoryDialogComponent, {
      disableClose: true,
      width: '40%',
      minWidth: '400px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(data => {
      if (typeof data == 'object') {
        this.menus.push(data);
      }
    });
  }

  saveProduct(product: Product): void {
    if (this.menus.length > 0) {
      product.menu_categories = this.menus;
    }
    this.loadingSave = true;
    this.storeDataSubscription = this.productsService.addProduct(product)
      .subscribe((data: any) => {
        this.loadingSave = false;
        this.showMessageSuccess('Se ha guardado el producto');
        this.router.navigate(['/products']);
      }, error => {
        this.loadingSave = false;
        this.showMessageError(error.error.errors.message);
      });
  }

  showMessageError(message) {
    return this.snack.open(message, '', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }
  showMessageSuccess(message) {
    return this.snack.open(message, '', {
      duration: 3000,
      panelClass: 'main-snackbar'
    });
  }

  updateProduct(product: Product): void {
    this.storeDataSubscription = this.productsService.updateProduct(product)
      .subscribe((data: any) => {
        console.log(data);
        this.router.navigate(['/products']);
      });
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
