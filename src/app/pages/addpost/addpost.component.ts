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

//uuid
import { v4 as uuidv4 } from "uuid";



@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  user = null;
  uploadPercent: number = null;
  picture: string = null;
  locationName: string;
  description: string;
  constructor(
    private router: Router,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toast: ToastService,
    private authservice: AuthService
  ) {
    authservice.getUser().subscribe(
      (user) => {
        this.db.object(`/users/${user.uid}`)
          .valueChanges()
          .subscribe(
            (user) => {
              this.user = user;
            });
      });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const uid = uuidv4();
    this.db.object(`/posts/${uid}`)
      .set({
        id: uid,
        locationName: this.locationName,
        description: this.description,
        picture: this.picture,
        by: this.user.name,
        instaId: this.user.instaid,
        date: Date.now()
      })
      .then(() => { this.toast.success("post added successfully"); this.router.navigateByUrl("/"); })
      .catch((err) => { this.toast.error(err.message); })
  }

  async uploadFile(event) {
    const file = event.target.files[0];
    let resizedImage = await readAndCompressImage(file, config);
    const fileRef = this.storage.ref(file.name);
    const task = this.storage.upload(file.name, resizedImage);

    task.percentageChanges().subscribe(
      (percentage) => {
        this.uploadPercent = percentage;
      });

    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.picture = url;
          this.toast.success("Image upload sucess");
        });
      }),
    ).subscribe();


  }

}
