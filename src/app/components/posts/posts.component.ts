import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  @Input()
  post ;
  upvote = 0;
  instaId = null;
  uid = null;
  
  likeimg = "../../../assets/like.png";

  constructor(private db : AngularFireDatabase, private auth : AuthService) {
    auth.getUser().subscribe((user)=> {this.uid = user?.uid});
   }

  ngOnInit(): void {
  }

  upvotePost(){
    this.db.object(`/posts/${this.uid}/vote/${this.uid}`).set({ upvote : this.upvote+1});
  }
  getInstaUrl(){
    console.log(this.post?.instaId);
    this.instaId = "https://www.instagram.com/"+this.post.instaId;
  }

  fillit(){
     this.likeimg === "../../../assets/like.png" ? this.likeimg = "../../../assets/like_filled.png" : this.likeimg = "../../../assets/like.png"
  }
}
