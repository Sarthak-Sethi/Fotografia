import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToSignIn = () => redirectUnauthorizedTo(['signin']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['']);


const routes: Routes = [
  {path:'signin',component:SigninComponent,canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectLoggedInToHome }},
  {path:'signup',component:SignupComponent,canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectLoggedInToHome }},
  {path:'addpost',component:AddpostComponent,canActivate: [AngularFireAuthGuard],data: { authGuardPipe: redirectUnauthorizedToSignIn }},
  {path:'error',component:PagenotfoundComponent},
  {path:'', component:HomeComponent ,canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToSignIn }},
  {path:'**', redirectTo:'/error',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
