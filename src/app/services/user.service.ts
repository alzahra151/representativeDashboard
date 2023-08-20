import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  Login(body: any) {
    return this.httpClient.post(`${environment.apiUrl}Representative/Login`, body)
  }
  Register(body: any) {
    return this.httpClient.post(`${environment.apiUrl}Representative`, body)
  }
}
