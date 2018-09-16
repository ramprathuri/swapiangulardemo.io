import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';


import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {

  isLoading:boolean = false;
  invalidCredentials:boolean = false;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });
  constructor(private http: HttpClient, private router: Router, private auth:AuthService) {}

  ngOnInit() {}

  get username() {
    return this.loginForm.get("username");
  }

  get password() {
    return this.loginForm.get("password");
  }
  singIn() {
    this.isLoading = true;
    this.auth.getLogin(this.loginForm.value)
      .subscribe(result => {
        if(result['count'] === 1){
            if(this.loginForm.value.password === result["results"][0]['birth_year']){
              localStorage.setItem('uname',this.loginForm.value.username);
              localStorage.setItem('password',this.loginForm.value.password);
              this.auth.getLoggedInUser(this.loginForm.value.username);
                this.router.navigate(['planets']);
            }else{
              this.invalidCredentials = true;
            }
        }else{
          this.invalidCredentials = true;
        }
       // console.log(result["count"], result["results"])
        this.isLoading = false;
      }, (error:Error) => {
        this.invalidCredentials = true;
        this.isLoading = false;

        //  window.alert(error.message.toString());


      });
  }
}
