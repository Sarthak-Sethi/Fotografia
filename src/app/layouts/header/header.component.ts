import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
;
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email:any = null;

  constructor(private authservice : AuthService,private router : Router) {
    authservice.getUser().subscribe(
      (user)=> {
        this.email = user?.email;
      },
      (err) => {
        console.log(err);
      }
    )
   } 
   
   ngOnInit(): void {
  }


   async handleSignOut(){
    try {
      this.email = null;
      const res = await this.authservice.signOut();
      this.router.navigateByUrl('/signin');
      // this.toast.info('login Again to continue');

    
    }
    catch(error) {
      // this.toast.error("Something went wrong");
    }
  }

 

}
