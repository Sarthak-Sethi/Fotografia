import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostsComponent } from './components/posts/posts.component';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { AddpostComponent } from './pages/addpost/addpost.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';


import { ToastService, AngularToastifyModule } from 'angular-toastify'; 
import { FormsModule } from '@angular/forms';

// FireBAse Related imports 
import { AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireModule} from '@angular/fire';

import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    PostsComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddpostComponent,
    PagenotfoundComponent,
    SigninComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularToastifyModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
    
  ],
  providers: [ToastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
