import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  builder: FormBuilder = new FormBuilder();
  group: FormGroup;

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  /**
   * @description Creates a FormGroup instance to check if the form is valid
   */
  buildForm(): void {
    this.group = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  sendData(): void {
    console.log('Sending data...');
  }

  /**
   * @description Given a form control name it checks if there is an error with the code specified.
   * @param inputName Form control name.
   * @param errorType Error code.
   */
  getInputError(inputName: string, errorType: string): any {
    return this.group.get(inputName).getError(errorType);
  }
}
