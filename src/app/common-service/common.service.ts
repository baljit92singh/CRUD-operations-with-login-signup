import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(public http: HttpClient) { }

  login(data): Observable<any> {
    console.log(data);
    return this.http.post('http://183.182.84.84/restapi/wp-json/jwt-auth/v1/token', data)
  }

  signup(data): Observable<any> {
    return this.http.post('http://183.182.84.84/restapi/wp-json/wp/v2/users/register', data)
  }

  getPost(): Observable<any> {
    return this.http.get('http://183.182.84.84/restapi/wp-json/wp/v2/posts')
  }

  createPost(data): Observable<any> {
    return this.http.post('http://183.182.84.84/restapi/wp-json/wp/v2/posts', data)
  }

  updatePost(id, data): Observable<any> {
    return this.http.post('http://183.182.84.84/restapi/wp-json/wp/v2/posts/' + id, data)
  }

  deletePost(id): Observable<any> {
    return this.http.delete('http://183.182.84.84/restapi/wp-json/wp/v2/posts/' + id)
  }
}
