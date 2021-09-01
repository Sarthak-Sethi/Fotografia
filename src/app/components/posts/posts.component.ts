import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit,OnChanges {

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
  ngOnChanges(): void {
    if (this.post.vote) {
      Object.values(this.post.vote).map((val: any) => {
        if (val.upvote===1) {
          this.upvote += 1;
        }
      });
    }
  }

  upvotePost(){
   this.db.object(`/posts/${this.post.id}/vote/${this.uid}`).set({ upvote : 1});
  }
  getInstaUrl(){
    console.log(this.post?.instaId);
    this.instaId = "https://www.instagram.com/"+this.post.instaId;
  }

  fillit(){
     this.likeimg === "../../../assets/like.png" ? this.likeimg = "../../../assets/like_filled.png" : this.likeimg = "../../../assets/like.png"
  }
}
