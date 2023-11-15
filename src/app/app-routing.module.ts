import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoginComponent } from './components/login/LoginComponent';
import { OfferPDFComponent } from './components/offer-pdf/offer-pdf.component';
// import { AllRequestesComponent } from './components/all-requestes/all-requestes.component';
import { AuthGuard } from './guards/auth.guard';
import { RequestFormComponent } from './components/representativeComponents/request-form/request-form.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReqDetailsComponent } from './components/representativeComponents/req-details/req-details.component';
import { EditFormComponent } from './components/representativeComponents/edit-form/edit-form.component';
import { CommentedReqComponent } from './components/representativeComponents/commented-req/commented-req.component';
// import { MangerHomeComponent } from './components/manger-home/manger-home.component';
import { AdminGuard } from './guards/admin.guard';
import { ReqDetailsManagerComponent } from './components/mangerComponents/req-details-manager/req-details-manager.component';
import { AcceptedRequestComponent } from './components/mangerComponents/accepted-request/accepted-request.component';
import { RejectedRequestComponent } from './components/mangerComponents/rejected-request/rejected-request.component';
import { ManagerSideBarComponent } from './components/mangerComponents/manager-side-bar/manager-side-bar.component';
import { ManagerLayoutComponent } from './components/mangerComponents/manager-layout/manager-layout.component';
import { ManagerHomeComponent } from './components/mangerComponents/manager-home/manager-home.component';
import { RepresentLayoutComponent } from './components/representativeComponents/represent-layout/represent-layout.component';
import { RequestArchiveComponent } from './components/representativeComponents/request-archive/request-archive.component';
// import { RepresentHomeComponent } from './components/representativeComponents/represent-home/represent-home.component';
import { AllRequestsComponent } from './components/mangerComponents/all-requests/all-requests.component';
import { RepresntHomeComponent } from './components/representativeComponents/represnt-home/represnt-home.component';
import { AcceptedReqsComponent } from './components/representativeComponents/accepted-reqs/accepted-reqs.component';
import { RejectedReqsComponent } from './components/representativeComponents/rejected-reqs/rejected-reqs.component';
import { AllReqsComponent } from './components/representativeComponents/all-reqs/all-reqs.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent, },
  { path: "register", component: RegistrationComponent },
  {
    path: "ManagerHome", component: ManagerLayoutComponent, canActivate: [AdminGuard],
    children: [

      { path: "", component: ManagerHomeComponent },
      { path: "Offer/:id", component: OfferPDFComponent },
      {
        path: "AllRequestes", component: AllRequestsComponent, ///done
        data: {
          roles: ['SalesManager'],
        },
      },
      { path: "approved-reqs", component: AcceptedRequestComponent },
      { path: "rejected-reqs", component: RejectedRequestComponent },
      { path: "ReqDetails/:id", component: ReqDetailsManagerComponent },
      // { path: "CommentedReqs", component: CommentedReqComponent }
    ]
  },
  {
    path: "RepresentHome", component: RepresentLayoutComponent, canActivate: [AuthGuard],
    children: [

      { path: "", component: RepresntHomeComponent },
      { path: "Offer/:id", component: OfferPDFComponent },
      {
        path: "requests-archieve", component: RequestArchiveComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['Representative'],
        },
      },
      { path: "RequestForm", component: RequestFormComponent },
      { path: "requests", component: AllReqsComponent },

      { path: "approved-reqs", component: AcceptedReqsComponent },
      { path: "rejected-reqs", component: RejectedReqsComponent },
      // { path: "commented-reqs", component: Comm },
      { path: "EditForm/:id", component: EditFormComponent },
      { path: "ReqDetails/:id", component: ReqDetailsComponent },
      { path: "CommentedReqs", component: CommentedReqComponent }

    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
