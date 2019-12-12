import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

describe('AuthGuard', () => {

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let authGuard: AuthGuard;
  let routerSpy;
  const activatedRouteMock: any = {snapshot: {}};
  const routeStateMock: any = {snapshot: {}, url: '/'};

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj<AuthService>(['isLoggedIn', 'setRedirectUrl']);
    routerSpy = {navigate: jasmine.createSpy('navigate')};
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        {provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy}
      ]
    });
  });

  beforeEach(() => {
    authGuard = TestBed.get(AuthGuard);
  });

  describe('when logged in =>', () => {
    beforeEach(() => {
      authServiceSpy.isLoggedIn.and.returnValue(true);
      TestBed.overrideProvider(AuthService, {useValue: authServiceSpy});
    });

    it('should allow route', () => {
      const result = authGuard.canActivate(activatedRouteMock, routeStateMock);

      expect(result).toBeTruthy('should activate route');
    });
  });

  describe('when not logged in =>', () => {
    beforeEach(() => {
      authServiceSpy.isLoggedIn.and.returnValue(false);
      TestBed.overrideProvider(AuthService, {useValue: authServiceSpy});
    });

    it('should not allow route and prepare post-login redirect', () => {
      const result = authGuard.canActivate(activatedRouteMock, routeStateMock);

      expect(result).toBeFalsy('should not activate route');
      expect(authServiceSpy.setRedirectUrl).toHaveBeenCalledWith(routeStateMock.url);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });
});

