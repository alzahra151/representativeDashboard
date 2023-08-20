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

    return this.httpClient.get(`${environment.apiUrl}PriceOffer/getRepresentativeOffers`, this.httpOptions)
  }
  getOfferById(id: any) {
    return this.httpClient.get(`${environment.apiUrl}PriceOffer/${id}`)
  }
  get token() {
    return localStorage.getItem('token')
  }
  getRepReqs() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/RepresenetitaveRequests`, this.httpOptions)
  }
  getAllReq() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/SalesMangerRequests`, this.httpOptions)
  }
}
