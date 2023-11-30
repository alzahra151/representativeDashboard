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
        'token': 'token ' + localStorage.getItem('token')
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
    console.log(localStorage.getItem('token'))
    return localStorage.getItem('token')
  }
  GetReqDetails(id: any) {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/${id}`)
  }

  updateReq(id: any, data: any) {
    return this.httpClient.patch(`${environment.apiUrl}PriceOfferReq/${id}`, data)
  }
  updatePriceOffer(id: any, data: any) {
    return this.httpClient.patch(`${environment.apiUrl}PriceOffer/${id}`, data)
  }
  updatePriceOfferService(offerId: any, data: any) {
    return this.httpClient.patch(`${environment.apiUrl}PriceOffer/${offerId}/service`, data)
  }
  getCommentedRepresentReqs() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/commented-represent-reqs`, this.options)
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
  getManagerAprovedReq() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/salesMangersApprovedReq`)
  }
  getRejectedReqs() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/rejected-req`)
  }
  reqsCount() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/reqs-count`)
  }
  representArchiveReq(limit: any, page: any) {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/RepresenetitaveRequests?limit=${limit}&page=${page}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'token ' + localStorage.getItem('token')
      }),
    })
  }
  representAcceptedReqs() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/reprsentative-approved-req`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'token ' + localStorage.getItem('token')
      }),
    })

  }
  representRejectedReqs() {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/reprsentative-rejected-req`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'token ' + localStorage.getItem('token')
      }),
    })

  }
  representCompletedReq(limit: any, page: any) {
    return this.httpClient.get(`${environment.apiUrl}PriceOfferReq/representative-complete-reqs?limit=${limit}&page=${page}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'token': 'token ' + localStorage.getItem('token')
      }),
    })
  }
}
