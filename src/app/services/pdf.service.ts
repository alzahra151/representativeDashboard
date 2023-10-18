import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private httpClient: HttpClient) { }
  generatePDF(offerData: any) {
    return this.httpClient.post(`${environment.apiUrl}PDF/SendEmail`, offerData, { responseType: 'blob' })
  }
  downloadPDF(offerData: any) {
    return this.httpClient.post(`${environment.apiUrl}PDF/down-pdf`, offerData, {
      headers: {
        "Accept": "application/pdf"
      }, responseType: 'blob'
    })
  }
}
