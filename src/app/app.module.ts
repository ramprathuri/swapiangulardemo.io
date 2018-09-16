import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { Routes, Router, RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AuthService } from "./services/auth.service";
import { AuthGuard } from "./guards/auth.guard";
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PlanetlistComponent } from './planetlist/planetlist.component';
import { PlanetdetailsComponent } from './planetdetails/planetdetails.component';
import { MainComponent } from './main/main.component';
import { AppErrors } from "./common/app.errors";
import { SearchdebounceComponent } from './searchdebounce/searchdebounce.component';



const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:'planets', component:PlanetlistComponent, canActivate:[AuthGuard]},
  {path:'details/:id', component:PlanetdetailsComponent,  canActivate:[AuthGuard]},

];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlanetlistComponent,
    PlanetdetailsComponent,
    MainComponent,
    SearchdebounceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
