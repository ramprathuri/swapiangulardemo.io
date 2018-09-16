import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router:Router) {}

  canActivate() {
    if(this.auth.isAuthenticated()){
        return true;
    }
      window.alert("you dont have permission to visit this page");
      this.router.navigate(['/login']);
      return false;
    }


}
