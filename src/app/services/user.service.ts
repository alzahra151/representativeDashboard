import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  imageSubject = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient) {
    this.imageSubject.next(localStorage.getItem('Image'));
  }
  Login(body: any) {
    return this.httpClient.post(`${environment.apiUrl}Representative/Login`, body)
  }
  Register(body: any) {
    return this.httpClient.post(`${environment.apiUrl}Representative`, body)
  }
  getRepresentatives() {
    return this.httpClient.get(`${environment.apiUrl}Representative/get-represntative`)
  }
  get token() {
    return localStorage.getItem('token')
  }
  getUser() {
    return this.httpClient.get(`${environment.apiUrl}Representative/get-user`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'token ' + this.token
      }),
    })
  }
  updateUser(data: any) {
    return this.httpClient.patch(`${environment.apiUrl}Representative/update-user`, data, {
      headers: new HttpHeaders({
        'encType': "multipart/form-data",
        'token': 'token ' + this.token
      }),
    })
  }

}
