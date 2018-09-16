import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-planetdetails',
  templateUrl: './planetdetails.component.html',
  styleUrls: ['./planetdetails.component.css']
})
export class PlanetdetailsComponent implements OnInit {

  planet;
  isLoading:boolean = false;
  constructor(private activateRoute:ActivatedRoute, private auth:AuthService ) { }

  ngOnInit() {
    this.isLoading = true;
    const id = this.activateRoute.snapshot.paramMap.get('id');
    //.subscribe(params =>{
      this.auth.getDetailsByPlanetId(id)
      .subscribe((resp) => {
        this.isLoading = false;
        this.planet = resp
      });
   // });


  }



}
