import { Component, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  isValidUser:boolean = false;
  constructor(private authService:AuthService, private router:Router){}

  logout(){
      this.authService.logout();
      this.router.navigate(['login']);

}
}
