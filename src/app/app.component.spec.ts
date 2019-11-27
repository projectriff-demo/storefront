import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {Component} from '@angular/core';
import {HomeComponent} from './home/home.component';

describe('AppComponent', () => {
  let fixture;
  let component;
  let dom;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        FakeCartComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should should show the cart', () => {
    expect(dom.querySelector('#fake-cart')).toBeTruthy('cart should be included');
  });
});

@Component({
  selector: 'app-cart',
  template: '<p id="fake-cart">yay</p>',
})
class FakeCartComponent {

}
