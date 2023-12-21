import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { authGuard } from './guard/auth.guard';
import { UserListComponent } from './component/user-list/user-list.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { provideEffects } from '@ngrx/effects';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  {path:"",component:HomeComponent,canActivate:[authGuard]},
  {path:"login",component:LoginComponent},
  {path:'adminHome',component:UserListComponent,canActivate:[authGuard]},
  {path:'admin',component:AdminLoginComponent},
  {path:"register",component:RegisterComponent},
  {path:'profile',component:ProfileComponent,canActivate:[authGuard]},
  {path:"**",redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
