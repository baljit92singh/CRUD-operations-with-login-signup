import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CommonService } from '../common-service/common.service';

@Component({
  selector: 'app-delete-post',
  templateUrl: './delete-post.component.html',
  styleUrls: ['./delete-post.component.css']
})
export class DeletePostComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeletePostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public commonService: CommonService) {
    console.log(data)
  }

  onNoClick(data?): void {
    this.dialogRef.close(data);
  }

  deletePost() {
    this.commonService.deletePost(this.data.id)
      .subscribe(res => {
        if (res) {
          this.onNoClick(res)
        }
      })
  }

  ngOnInit() {
  }

}
