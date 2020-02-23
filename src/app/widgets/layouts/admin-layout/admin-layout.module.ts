import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from '../../login/login.component';
import { AddMediaComponent } from '../../add-media/add-media.component';
import { SignupComponent } from '../../signup/signup.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxUiLoaderModule } from 'ngx-ui-loader';



@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    NgbModule,
    NgxUiLoaderModule,
    NgxPaginationModule ,
    NgbTypeaheadModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    LoginComponent,
    AddMediaComponent,
    SignupComponent
  ]
})

export class AdminLayoutModule {}
