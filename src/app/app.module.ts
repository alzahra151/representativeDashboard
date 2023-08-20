import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfferPDFComponent } from './components/offer-pdf/offer-pdf.component';
import { RequestComponent } from './components/request/request.component';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule } from 'primeng/messages';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AllRequestesComponent } from './components/all-requestes/all-requestes.component';

import { ReqDetailsComponent } from './components/req-details/req-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component';
import { CommentedReqComponent } from './components/commented-req/commented-req.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    NavbarComponent,
    MainLayoutComponent,
    HomeComponent,
    LoginComponent,
    OfferPDFComponent,
    RequestComponent,
    WrapperComponent,
    AllRequestesComponent,

    ReqDetailsComponent,
     RegistrationComponent,
     RequestFormComponent,
     EditFormComponent,
     PendingRequestsComponent,
     CommentedReqComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    MessagesModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
