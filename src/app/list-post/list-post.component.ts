import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common-service/common.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { CreatePostComponent } from '../create-post/create-post.component';
import { UpdatePostComponent } from '../update-post/update-post.component';
import { DeletePostComponent } from '../delete-post/delete-post.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  currentPostList = [];
  constructor(public commonService: CommonService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router) { }
    
  ngOnInit() {
    this.getPostList()
  }

  getPostList() {
    this.commonService.getPost()
      .subscribe(res => {
        this.currentPostList = res;
        console.log(this.currentPostList);
      })
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(CreatePostComponent, {
      width: '400px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) {
        this.snackBar.open("Created Successfully", 'Dismiss', { duration: 3000 });
        this.getPostList()
      }
    });
  }

  openEditDialog(item) {
    const dialogRef = this.dialog.open(UpdatePostComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) {
        this.snackBar.open("Updated Successfully", 'Dismiss', { duration: 3000 });
        this.getPostList()
      }
    });
  }

  openDeleteDialog(item) {
    const dialogRef = this.dialog.open(DeletePostComponent, {
      width: '400px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result !== undefined) {
        this.snackBar.open("Deleted Successfully", 'Dismiss', { duration: 3000 });
        this.getPostList()
      }
    });
  }

  logout() {
    localStorage.removeItem('token')
    this.router.navigate(['/login']);
  }
}
