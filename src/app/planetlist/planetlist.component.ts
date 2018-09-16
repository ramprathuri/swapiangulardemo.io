import { Component, OnInit, ErrorHandler } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Planet } from "../models/planet";
import {
  GET_PLANETS,
  RECORDS_PER_PAGE,
  GET_PLANET_PAGE
} from "../apiconstants";

import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-planetlist",
  templateUrl: "./planetlist.component.html",
  styleUrls: ["./planetlist.component.css"]
})
export class PlanetlistComponent implements OnInit {
  isLoading: boolean = true;
  pageNo: number = 0;
  planets: Planet[];
  records: number = 0;
  pages: number = 0;
  fontSize:number = 36;
  private now = new Date();

  constructor(private http: HttpClient, private auth: AuthService) {}

  searchHandler(value) {
    const current = new Date();

    // if(value){
    this.isLoading = true;
    this.auth.getPlanetsBySearch(value).subscribe(
      resp => {
        this.planets = this.mapPlanetResult(resp);
      },
      (error: Error) => {
        console.log(error.message.toString());
      }
    );
    // }
  }

  ngOnInit() {
   this.auth.getLoggedInUser(localStorage.getItem('uname'));
    this.isLoading = true;

    this.auth.getPlanets().subscribe(
      resp => {
        this.planets = this.mapPlanetResult(resp);
      },
      (error: Error) => {
        this.isLoading = false;
        console.log(error.message);
      }
    );
  }

  mapPlanetResult(resp) {
    this.isLoading = false;
    this.records = resp.count;
    this.pages = Math.floor(this.records / RECORDS_PER_PAGE);
    const resultPlanets: Planet[] = [];
    const _planets = resp["results"];
    if (_planets.length > 0) {
      //  this.planets = [];
      _planets.map(item => {
        const lastId = item.url.split("/");
        const id = lastId[lastId.length - 2];
        const strength = this.parseColor(item.population);

        resultPlanets.push(new Planet(id, item.name, item.population, strength));
      });
    }
    return resultPlanets;
  }
   parseColor(color) {

   // if (typeof color === 'number') {
        color = parseInt(color, 10).toString(16);
        color = '#' + ('00000' + (color | 0).toString(16)).substr(-6);
    //}
console.log(color);
    return color;

    }
  nextPage() {
    if (this.pages > this.pageNo) {
      this.isLoading = true;
      this.pageNo++;
      this.auth
        .getPlanetsByPage(this.pageNo)
        .subscribe(resp => (this.planets = this.mapPlanetResult(resp)));
    }
  }
  prevPage() {
    if (this.pageNo > 1) {
      this.isLoading = true;
      this.pageNo--;
      this.auth
        .getPlanetsByPage(this.pageNo)
        .subscribe(resp => (this.planets = this.mapPlanetResult(resp)));
    }
  }
}
