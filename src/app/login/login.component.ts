import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CommonService } from '../common-service/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public snackBar: MatSnackBar,
    public commonService: CommonService
  ) {
    this.loadForm();
  }
  loadForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  loginData() {
    let item = {
      username: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value
    }
    console.log(item);
    this.commonService.login(item)
      .subscribe(res => {
        if (res.code === "200") {
          localStorage.setItem('token', JSON.stringify(res.token))
          this.router.navigate(['/post-list']);
          this.snackBar.open(res.message, 'Dismiss', { duration: 3000 });
        } 
      });
  }

  ngOnInit() {
  }

}
