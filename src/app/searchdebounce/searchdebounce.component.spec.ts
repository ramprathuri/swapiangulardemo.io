import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchdebounceComponent } from './searchdebounce.component';

describe('SearchdebounceComponent', () => {
  let component: SearchdebounceComponent;
  let fixture: ComponentFixture<SearchdebounceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchdebounceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchdebounceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
