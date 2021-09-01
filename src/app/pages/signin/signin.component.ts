import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { AuthService } from 'src/app/services/auth.service';

import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';

import { finalize } from 'rxjs/operators';

import { readAndCompressImage } from 'browser-image-resizer';
import { ToastService } from 'angular-toastify';
import { config } from 'src/app/utils/config';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authservice : AuthService,private router : Router,private toast: ToastService ) { }

  ngOnInit(): void {
  }

  onSubmit(f:NgForm){
    const{email,password} = f.form.value;
    this.authservice.signIn(email,password)
    .then(
      (res)=> {
        this.toast.success("Sign In Sucessfull");
        this.router.navigateByUrl("/");
      }
    ).catch(
      (err)=> {
        this.toast.error(err.message);
      }
    )
  }
}
