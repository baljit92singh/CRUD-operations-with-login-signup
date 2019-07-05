import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CommonService } from '../protected/common-service/common.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    public commonService: CommonService
  ) {
    this.loadForm();
  }
  loadForm() {
    this.signUpForm = this.fb.group({
      // , Validators.pattern('^[a-zA-Z0-9 \'\-]+$')
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.email, Validators.required, Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      role: 'author'
    })
  }
  signUpData() {
    let item = {
      username: this.signUpForm.controls['userName'].value,
      password: this.signUpForm.controls['password'].value,
      email: this.signUpForm.controls['email'].value,
      first_name: this.signUpForm.controls['firstName'].value,
      Last_name: this.signUpForm.controls['lastName'].value,
      role: 'author'
    }
    console.log(item);
    this.commonService.signup(item)
      .subscribe(res => this.registerSuccess(res),
        err => this.errorHandle(err))

  }
  registerSuccess(data) {
    if (data.code === 200) {
      this.router.navigate(['/login']);
      this.snackBar.open(data.message, 'Dismiss', { duration: 3000 });
    }
  }

  errorHandle(error) {
    console.log(error.error.message)
    this.snackBar.open(error.error.message, 'Dismiss', { duration: 3000 });
  }

  get f() { return this.signUpForm.controls; }

  onlyAlphanumeric(event: any) {
    const pattern = /[a-zA-Z0-9\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  ngOnInit() {
  }

}
