import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users = [];
  posts =[];
  isLoading : boolean = false;
  constructor(private db :AngularFireDatabase,private toast : ToastService) {
    this.isLoading = true;
    // grab all users
    db.object('/users')
    .valueChanges()
    .subscribe((obj) => {
      obj ? this.users = Object.values(obj) : toast.error("no user found");
    });

    // grab all posts
    db.object('/posts')
    .valueChanges()
    .subscribe((obj) => {
      if(obj) {
       this.posts = Object.values(obj).sort((d1,d2) => d2.date - d1.date );
       this.isLoading = false;
      }
      else {
        toast.error("No post here .. !");
        this.isLoading = false;
      }
      
    });

   }

  ngOnInit(): void {
  }

}
