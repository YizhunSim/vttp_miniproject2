import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { BreadcrumbModule } from 'xng-breadcrumb';
import { LoginStatusComponent } from '../components/login-status/login-status.component';
import { CartStatusComponent } from '../components/cart-status/cart-status.component';



@NgModule({
  declarations: [
    NavBarComponent,
    SectionHeaderComponent,
    LoginStatusComponent,
    CartStatusComponent

  ],
  imports: [
    CommonModule,
    RouterModule,
    BreadcrumbModule,
  ],
  exports: [
    NavBarComponent,
    SectionHeaderComponent,
    LoginStatusComponent

  ]
})
export class CoreModule { }
