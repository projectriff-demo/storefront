import {async, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

describe('LoginComponent', () => {
  const fakeRoute = 'redirect';
  let form;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: { navigate: jasmine.Spy };

  beforeEach(async(() => {
    authServiceSpy = jasmine.createSpyObj(['logIn', 'getRedirectUrl']);
    authServiceSpy.getRedirectUrl.and.returnValue(fakeRoute);
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        {provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(LoginComponent);
    const dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();

    form = dom.querySelector('form');
  });

  it('displays a login form', () => {
    expect(form).toBeTruthy('login form should be present');
  });

  it('fails to log in if the username is blank', () => {
    setValue(form.querySelector('#username'), '   ');

    form.querySelector('button[type="submit"]').click();

    expect(authServiceSpy.logIn).not.toHaveBeenCalled();
    expect(Array.from(form.querySelector('#username').classList)).toContain('ng-invalid');
  });

  it('logs in the username is blank', () => {
    const username = 'some-username';
    setValue(form.querySelector('#username'), username);

    form.querySelector('button[type="submit"]').click();

    expect(authServiceSpy.logIn).toHaveBeenCalledWith(username);
    expect(routerSpy.navigate).toHaveBeenCalledWith([fakeRoute], {replaceUrl: true});
  });


  const setValue = (element, value) => {
    element.value = value;
    element.dispatchEvent(new Event('input'));
  };
});
