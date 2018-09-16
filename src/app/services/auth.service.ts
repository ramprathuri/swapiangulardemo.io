import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


import { GET_PLANETS, GET_LOGIN,GET_PLANET_SEARCH,
  GET_PLANET_PAGE, PLANET_SEARCH_LIMIT } from "../apiconstants";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isValidUser:boolean = false;
  private now;
  private searchCount:number = 0;

  @Output() user: EventEmitter<string> = new EventEmitter();



  constructor(private http: HttpClient) { }

  isAuthenticated(): boolean {
    if(localStorage.getItem('uname') && localStorage.getItem('password')){
      this.isValidUser = true;
        return true;
    }
    return false;
  }



getLoggedInUser(loginUser?:string){
  if(localStorage.getItem('uname')){
    loginUser = localStorage.getItem('uname');
  }
  this.user.emit(loginUser);
}

  getLogin(values):Observable<any>{
    return (this.http
    .get(GET_LOGIN
      + values.username
    ));
  }
  getPlanetsBySearch(key):Observable<any>{

    if(localStorage.getItem('uname') === 'Luke Skywalker'){
      if(!this.startSearchLimit()){
        window.alert('You have aceceeded no of searches per minute. Please try after some time');
      }

    }
    return (this.http.get(GET_PLANET_SEARCH+key));

  }

  startSearchLimit(): boolean{

    this.searchCount++;
    if(this.searchCount === 1){
      this.now = new Date();
    }

    if(this.searchCount > PLANET_SEARCH_LIMIT){
      const current = new Date();
      if((current.getTime() -  this.now.getTime())/(60*1000) <= 1 ){
        return false;
      }else{
        this.searchCount = 1;
        this.now = new Date();
      }

    }

    return true;
  }

  getPlanets():Observable<any>{
    return (this.http.get(GET_PLANETS));
  }
  getPlanetsByPage(pageno):Observable<any>{
    return (this.http.get(GET_PLANET_PAGE+pageno));
  }

  getDetailsByPlanetId(id){
    return (this.http.get(GET_PLANETS+id+'/'));
  }

  logout(){

    localStorage.clear();
    this.isValidUser = true;
    this.getLoggedInUser('Guest');

  }


}
