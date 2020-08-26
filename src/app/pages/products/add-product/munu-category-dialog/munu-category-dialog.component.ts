import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-munu-category-dialog',
  templateUrl: './munu-category-dialog.component.html',
  styleUrls: ['./munu-category-dialog.component.scss']
})
export class MunuCategoryDialogComponent implements OnInit {

  group: FormGroup;
  isRange = false;

  constructor(public dialogRef: MatDialogRef<MunuCategoryDialogComponent>,
    private fb: FormBuilder, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.group = this.fb.group({
      name: [null, Validators.required],
      is_obligatory: [null, Validators.required],
      is_range: ['0', Validators.required],
      limit_options_choose: [null],
      min_options_choose: [null],
      max_options_choose: [null],
      options: this.fb.array([this.createOptionForm()], Validators.required)
    });
  }

  createOptionForm(): FormGroup {
    return this.fb.group({
      name: [null, Validators.required],
      price: [0],
    });
  }

  get optionsFormData(): any { return this.group.get('options'); }
  
  addOption() {
    let optionsForm = this.group.get('options');
    if (optionsForm.invalid) {
      optionsForm.markAllAsTouched();
      return;
    }
    const forms: FormArray = optionsForm as FormArray;
    forms.push(this.createOptionForm());
  }

  saveMenuCategory() {
    // ======= VALIDACIONES ======== 
    if (this.group.invalid) {
      this.group.markAllAsTouched();
      return;
    }
    const menu = this.group.value;
    if (this.isRange) {
      if (menu.min_options_choose == null
        || menu.max_options_choose == null) {
          this.showMessageError('Ingresa el mínimo y máximo de articulos que el cliente puede seleccionar');
        return;
      }
      menu.limit_options_choose = 0;
    } else {
      if (menu.limit_options_choose == null) {
          this.showMessageError('¿Cuántos articulos puede seleccionar el cliente?');
        return;
      }
      menu.min_options_choose = 0;
      menu.max_options_choose = 0;
    }
    // ======= TERMINA LAS VALIDACIONES ======== 
    this.dialogRef.close(menu);
  }

  showMessageError(message) {
    return this.snack.open(message, '', {
      duration: 5000,
      panelClass: 'error-snackbar'
    });
  }


  changeTypeRange(value) {
    this.isRange = value == '1' ? true : false;
  }

  isFieldInvalid( group: FormGroup, field: string): boolean {
    return (group.get(field).invalid && group.get(field).touched);
  }

  isFieldValid(group: FormGroup, field: string): boolean {
    return (group.get(field).valid && group.get(field).touched);
  }

  hasFieldError(group: FormGroup, field: string, errorcode: string): boolean {
    return (group.get(field).hasError(errorcode));
  }

}
