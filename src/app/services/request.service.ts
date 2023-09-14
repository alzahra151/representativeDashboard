import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentPlan } from '../models/payment-plan';
import { PriceOffer } from '../models/price-offer';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  options = {}

  constructor(private httpClient: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'token ' + this.token
      }),
    }
  }

  AddPriceOfferReq(data: any) {
    return this.httpClient.post(`${environment.apiUrl}PriceOfferReq/AddRequest`, data, this.options)
  }

  GetServices() {
    return this.httpClient.get(`${environment.apiUrl}Service/GetServices`)
  }
  get token() {
    return localStorage.getItem('token')
  }
  GetReqDetails(id: any) {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/${id}`)
  }

  updateReq(id: any, data: any) {
    return this.httpClient.patch(`${environment.apiUrl}PriceOfferReq/${id}`, data)
  }
  getCommentedReqs() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/CommentedReqs`, this.options)
  }
  getDeviceById(id: any) {
    return this.httpClient.get(`${environment.apiUrl}Device/${id}`);
  }
  getPaymentPlans(): Observable<PaymentPlan[]> {
    return this.httpClient.get<PaymentPlan[]>(`${environment.apiUrl}PaymentPlan/getPaymentPlans`)
  }
  AddPriceOffer(data: any): Observable<PriceOffer> {
    return this.httpClient.post<PriceOffer>(`${environment.apiUrl}PriceOffer/AddPriceOffer`, data)
  }
}
