import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  builder: FormBuilder = new FormBuilder();
  group: FormGroup;
  addCategorySubscription: Subscription;

  constructor(private categoriesService: CategoriesService) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.addCategorySubscription.unsubscribe();
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
    const newCategory: Category = {
      name: this.group.get('name').value,
    }

    this.addCategorySubscription = this.categoriesService.addCategory(newCategory)
    .subscribe((data: any) => {
      console.log(data);
    }, (error: any) => {
      console.error(error);
    });
  }
}
