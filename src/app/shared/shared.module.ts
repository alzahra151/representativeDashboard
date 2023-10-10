import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestCardComponent } from './components/request-card/request-card.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReprentativeMainCardComponent } from './components/reprentative-main-card/reprentative-main-card.component';



@NgModule({
  declarations: [
    RequestCardComponent,
    NavbarComponent,
    ReprentativeMainCardComponent,

  ],
  imports: [
    RouterModule,
    CommonModule,

  ],
  exports: [
    RequestCardComponent, RouterModule, NavbarComponent, ReprentativeMainCardComponent]
})
export class SharedModule { }
