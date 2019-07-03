import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common-service/common.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  StatusList = ['publish', 'future', 'draft', 'pending', 'private'];
  constructor(
    public dialogRef: MatDialogRef<CreatePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: FormBuilder,
    public commonService: CommonService) {
    this.loadForm();
  }
  loadForm() {
    this.createPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')]],
      content: ['', [Validators.required, Validators.maxLength(250)]],
      status: ['', Validators.required]
    })
  }
  createPost() {
    let item = {
      title: this.createPostForm.controls['title'].value,
      content: this.createPostForm.controls['content'].value,
      status: this.createPostForm.controls['status'].value
    }
    console.log(item);
    this.commonService.createPost(item)
      .subscribe(res => {
        if (res) {
          console.log(res);
          this.onNoClick(res)
        }
      })
  }

  onNoClick(data?): void {
    this.dialogRef.close(data);
  }

  ngOnInit() {
  }

}
