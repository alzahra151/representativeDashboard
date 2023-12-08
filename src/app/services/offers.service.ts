import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  httpOptions: any
  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `token ${this.token || ''}`
      })
    };
  }

  getAgentOffers() {

    return this.httpClient.get(`${environment.apiUrl}PriceOffer/getRepresentativeOffers`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `token ${this.token || ''}`
      })
    })
  }
  getOfferById(id: any) {
    return this.httpClient.get(`${environment.apiUrl}PriceOffer/${id}`)
  }
  get token() {
    return localStorage.getItem('token')
  }
  getRepReqs() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/RepresenetitaveRequests`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `token ${this.token || ''}`
      })
    })
  }
  getAllReq(limit: any, page: any) {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/SalesMangerRequests?limit=${limit}&page=${page}`, this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': `token ${this.token || ''}`
      })
    })
  }
}
