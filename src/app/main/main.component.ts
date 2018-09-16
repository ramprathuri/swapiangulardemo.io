import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  guest:string = "Guest";
  constructor(private authService:AuthService, private router:Router){}

  //isLoggedIn:boolean = true;
  ngOnInit() {
    // const uname = localStorage.getItem('uname');
    // if(uname){
    //   this.guest = uname || 'Guest';
    // }
    this.authService.user.subscribe(guest => this.guest = guest);
  }



  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);

}
}
