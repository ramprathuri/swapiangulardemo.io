import { ErrorHandler } from "@angular/core";


export class AppErrors extends ErrorHandler{
    handleError(){
      alert('An unspected error occured')
    }
}
