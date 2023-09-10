import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OfferPDFComponent } from './components/offer-pdf/offer-pdf.component';
import { RequestComponent } from './components/request/request.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AllRequestesComponent } from './components/all-requestes/all-requestes.component';
import { AuthGuard } from './guards/auth.guard';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReqDetailsComponent } from './components/req-details/req-details.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { CommentedReqComponent } from './components/commented-req/commented-req.component';
import { MangerHomeComponent } from './components/manger-home/manger-home.component';
import { RepresentativeHomeComponent } from './components/representative-home/representative-home.component';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: "", component: LoginComponent, },
  { path: "register", component: RegistrationComponent },
  {
    path: "ManagerHome", component: MainLayoutComponent, canActivate: [AdminGuard],
    children: [

      { path: "", component: MangerHomeComponent },
      { path: "Offer/:id", component: OfferPDFComponent },
      {
        path: "Requests", component: RequestComponent,
        // canActivate: [AuthGuard],
        data: {
          roles: ['Representative'],
        },
      },
      {
        path: "AllRequestes", component: AllRequestesComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['SalesManager'],
        },

      },
      { path: "RequestForm", component: RequestFormComponent },
      { path: "Requests/EditForm/:id", component: EditFormComponent },
      { path: "Requests/ReqDetails/:id", component: ReqDetailsComponent },
      { path: "CommentedReqs", component: CommentedReqComponent }

    ]
  },
  {
    path: "RepresentHome", component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [

      { path: "", component: RepresentativeHomeComponent },
      { path: "Offer/:id", component: OfferPDFComponent },
      {
        path: "Requests", component: RequestComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['Representative'],
        },
      },
      {
        path: "AllRequestes", component: AllRequestesComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['SalesManager'],
        },

      },
      { path: "RequestForm", component: RequestFormComponent },
      { path: "Requests/EditForm/:id", component: EditFormComponent },
      { path: "Requests/ReqDetails/:id", component: ReqDetailsComponent },
      { path: "CommentedReqs", component: CommentedReqComponent }

    ]
  },




];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
