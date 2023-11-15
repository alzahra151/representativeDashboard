import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
// import { MainLayoutComponent } from './components/mangerComponents/main-layout/main-layout.component';
// import { LoginComponent } from './components/login/LoginComponent';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OfferPDFComponent } from './components/offer-pdf/offer-pdf.component';
import { DialogModule } from 'primeng/dialog';
// import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
// import { AllRequestesComponent } from './components/all-requestes/all-requestes.component';

import { ReqDetailsComponent } from './components/representativeComponents/req-details/req-details.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RequestFormComponent } from './components/representativeComponents/request-form/request-form.component';
import { EditFormComponent } from './components/representativeComponents/edit-form/edit-form.component';
import { CommentedReqComponent } from './components/representativeComponents/commented-req/commented-req.component';
import { AuthGuard } from './guards/auth.guard';
// import { MangerHomeComponent } from './components/manger-home/manger-home.component';
import { AdminGuard } from './guards/admin.guard';
import { SharedModule } from '../app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReqDetailsManagerComponent } from './components/mangerComponents/req-details-manager/req-details-manager.component';
import { AcceptedRequestComponent } from './components/mangerComponents/accepted-request/accepted-request.component';
import { RejectedRequestComponent } from './components/mangerComponents/rejected-request/rejected-request.component';
import { CommentedRequestComponent } from './components/mangerComponents/commented-request/commented-request.component';
import { ManagerSideBarComponent } from './components/mangerComponents/manager-side-bar/manager-side-bar.component';
import { AllRequestsComponent } from './components/mangerComponents/all-requests/all-requests.component';
import { ManagerLayoutComponent } from './components/mangerComponents/manager-layout/manager-layout.component';
import { ManagerHomeComponent } from './components/mangerComponents/manager-home/manager-home.component';
import { RepresentLayoutComponent } from './components/representativeComponents/represent-layout/represent-layout.component';
import { AcceptedReqsComponent } from './components/representativeComponents/accepted-reqs/accepted-reqs.component';
import { RejectedReqsComponent } from './components/representativeComponents/rejected-reqs/rejected-reqs.component';
import { RequestArchiveComponent } from './components/representativeComponents/request-archive/request-archive.component';
import { SideBareComponent } from './components/representativeComponents/side-bare/side-bare.component';
import { RepresntHomeComponent } from './components/representativeComponents/represnt-home/represnt-home.component';
import { MainReqCardComponent } from './components/representativeComponents/main-req-card/main-req-card.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AllReqsComponent } from './components/representativeComponents/all-reqs/all-reqs.component';
import { MessagesModule } from 'primeng/messages';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from './components/login/login.component';
// import { AllReqsComponent } from './components/representativeComponents/all-reqs/AllReqsComponent';

// import { AllRequestesComponent } from './components/mangerComponents/all-requestes/all-requestes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OfferPDFComponent,
    AllRequestsComponent,

    ReqDetailsComponent,
    RegistrationComponent,
    RequestFormComponent,
    EditFormComponent,
    CommentedReqComponent,
    ManagerHomeComponent,
    ReqDetailsManagerComponent,
    AcceptedRequestComponent,
    RejectedRequestComponent,
    CommentedRequestComponent,
    ManagerSideBarComponent,
    AllRequestsComponent,
    ManagerLayoutComponent,
    ManagerHomeComponent,
    RepresentLayoutComponent,
    AcceptedReqsComponent,
    RejectedReqsComponent,
    CommentedRequestComponent,
    RequestArchiveComponent,
    SideBareComponent,
    RepresntHomeComponent,
    MainReqCardComponent,
    AllReqsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ButtonModule,
    SidebarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    DialogModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    NgxExtendedPdfViewerModule,
    InputTextareaModule,
    DropdownModule,
    InputTextModule,
    ProgressSpinnerModule,
    FormsModule,
    SharedModule,
    RouterModule,
    MessagesModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard, AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
