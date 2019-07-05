import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  currentUser
  constructor(public router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.currentUser)
  }

  ngOnInit() {

  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
}
