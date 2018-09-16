import { Component, OnInit, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { Observable, pipe, fromEvent } from "rxjs";
import { map, debounceTime, distinctUntilChanged} from 'rxjs/operators';


@Component({
  selector: 'app-searchdebounce',
  template: `

  <h2>Search For Planets</h2>
         <div id="custom-search-input">
                          <div class="input-group col-md-12">
                              <input type="text" class="search-query form-control"
                               placeholder="Search"
                               [(ngModel)]="enteredValue"/>
                              <span class="input-group-btn">
                                  <button class="btn btn-danger" type="button">
                                      <span class="glyphicon glyphicon-search"></span>
                                  </button>
                              </span>
                          </div>
                      </div>

  `,
  styleUrls: ['./searchdebounce.component.css']
})
export class SearchdebounceComponent implements OnInit {

  @Input() Placeholder: string;
  @Input() delay: number = 300;
  @Output() value: EventEmitter<any> = new EventEmitter();

  enteredValue:string;

  constructor(private ele: ElementRef) {
    const eventStream = fromEvent(ele.nativeElement, 'keyup')
    .pipe(
    map(() => this.enteredValue),
    debounceTime(this.delay),
    distinctUntilChanged()
  );
      eventStream.subscribe(input => this.value.emit(input));

  }

  ngOnInit() {
  }

}
