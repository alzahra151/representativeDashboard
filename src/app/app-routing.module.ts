import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OfferPDFComponent } from './components/offer-pdf/offer-pdf.component';
import { RequestComponent } from './components/request/request.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { AllRequestesComponent } from './components/all-requestes/all-requestes.component';
import { authGuard } from './guards/auth.guard';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReqDetailsComponent } from './components/req-details/req-details.component';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { CommentedReqComponent } from './components/commented-req/commented-req.component';

const routes: Routes = [
  { path: "", component: LoginComponent, },
  { path: "register", component: RegistrationComponent },
  {
    path: "home", component: MainLayoutComponent,
    children: [

      { path: "", component: HomeComponent },
      { path: "Offer/:id", component: OfferPDFComponent },
      {
        path: "Requests", component: RequestComponent,
        canActivate: [authGuard],
        data: {
          roles: ['Representative'],
        },
      },
      {
        path: "AllRequestes", component: AllRequestesComponent,
        canActivate: [authGuard],
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
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
