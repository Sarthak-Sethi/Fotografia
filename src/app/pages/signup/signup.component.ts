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
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  picture: String = "https://i.ibb.co/2q8dh3b/logo.png";
  uploadPercent: number = null;


  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toast: ToastService,
    private authservice :AuthService
  ) {

  }

  ngOnInit(): void {


  }
  onSubmit(f: NgForm) {
    const { email, password, instaid, country, bio, name } = f.form.value;
    // further checking of these fields ro be done here 

    // its an observable so we can add as many "then" as we want ... 
    // we added 2 then .. one to redirect and other to save data
    // then last is to catch the error
    this.authservice.signUp(email, password)
      .then((res) => {
        console.log(res);
        const { uid } = res.user
        this.db.object(`/users/${uid}`).set({
          id: uid,
          name: name,
          instaid: instaid,
          country: country,
          bio: bio,
          picture: this.picture
        });
      })
      .then(() => {
        this.router.navigateByUrl('/');
        this.toast.success("SignUp Sucess");
      })
      .catch(
        (err) => {
          console.log();
          
          this.toast.error(err.message);
          console.log(err);
          
        }
      );
  }

  async uploadFile(event) {
    // this is an array which stores all the images links
    const file = event.target.files[0];
    // from the documentation ..
    let resizedImage = await readAndCompressImage(file, config);
    const filepath = file.name;
    // rename the image with uuid /
    // TODO:
    const fileref = this.storage.ref(filepath);

    const task = this.storage.upload(filepath, resizedImage);

    task.percentageChanges().subscribe(
      (percentage) => {
        this.uploadPercent = percentage;
      }
    )

    task.snapshotChanges().pipe(
      finalize(() => {
        fileref.getDownloadURL().subscribe((picture_url_from_firebase) => {
          this.picture = picture_url_from_firebase;
          this.toast.success("image uploaded sucessfully");
        })
      })
    ).subscribe();

  }
}
