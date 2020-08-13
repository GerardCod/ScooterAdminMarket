import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  builder: FormBuilder = new FormBuilder();
  group: FormGroup;
  category: Category;
  id: number;
  imageURL: string;
  storeDataSubscription: Subscription;
  categorySubscription: Subscription;

  constructor(private categoriesService: CategoriesService, private route: ActivatedRoute, private router: Router) {
    this.buildForm();
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
  }

  ngOnInit(): void {
    if (this.id) {
      this.categorySubscription = this.categoriesService
      .getCategoryById(Number(this.id))
      .subscribe((data: Category) => {
        this.category = data;
        console.log(this.category);
        this.group.get('name').setValue(this.category.name);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.storeDataSubscription) {
      this.storeDataSubscription.unsubscribe();
    }

    if (this.categorySubscription) {
      this.categorySubscription.unsubscribe();
    }
  }

  buildForm(): void {
    this.group = this.builder.group({
      name: ['', [Validators.required]]      
    });
  }

  isFieldInvalid(group: FormGroup, field: string): boolean {
    return (this.group.get(field).invalid && this.group.get(field).touched);
  }

  hasFieldError(group: FormGroup, field: string, error: string): boolean {
    return (group.get(field).hasError(error));
  }

  sendData(): void {
    this.category = {
      name: this.group.get('name').value,
    }

    if (this.imageURL) {
      this.category.picture = this.imageURL;
    }

    if (this.id) {
      this.category.id = this.id;
      this.updateCategory(this.category);
    } else {
      this.saveCategory(this.category);
    }
  }

  saveCategory(category: Category): void {
    this.storeDataSubscription = this.categoriesService.addCategory(category)
    .subscribe((data: any) => {
      this.router.navigate(['/categories']);
    }, (error: any) => {
      console.error(error);
    });
  }

  updateCategory(category: Category): void {
    this.storeDataSubscription = this.categoriesService.updateCategory(category)
    .subscribe((data: any) => { this.router.navigate(['/categories']); },
    (error: any) => { console.error(error); });
  }

  handlePickUpImage(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageURL = String(reader.result);
    }
  }
}
