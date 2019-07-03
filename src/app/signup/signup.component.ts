import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CommonService } from '../common-service/common.service';

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
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(8)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.email, Validators.required, Validators.minLength(8),]],
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]]
    })
  }
  signUpData() {
    let item = {
      username: this.signUpForm.controls['userName'].value,
      password: this.signUpForm.controls['password'].value,
      email: this.signUpForm.controls['email'].value,
      first_name: this.signUpForm.controls['firstName'].value,
      Last_name: this.signUpForm.controls['lastName'].value,
    }
    console.log(item);
    this.commonService.signup(item).subscribe(res => {
      if (res.code === 200) {
        this.router.navigate(['/login']);
        this.snackBar.open(res.message, 'Dismiss', { duration: 3000 });
      } 
    })
  }

  ngOnInit() {
  }

}
