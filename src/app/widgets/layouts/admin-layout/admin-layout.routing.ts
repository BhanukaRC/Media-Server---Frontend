import { Routes } from '@angular/router';


import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { LoginComponent } from '../../login/login.component';
import { AddMediaComponent } from '../../add-media/add-media.component';
import { SignupComponent } from '../../signup/signup.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'login', component: LoginComponent},
    { path: 'add-media', component: AddMediaComponent },
    { path: 'sign-up', component: SignupComponent}
];
