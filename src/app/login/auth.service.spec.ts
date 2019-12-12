import {TestBed} from '@angular/core/testing';

import {AuthService} from './auth.service';
import {Globals} from '../globals';
import {InMemoryStorage} from '../storage/in-memory-storage';

describe('AuthService', () => {
  let service: AuthService;
  const testStorage: Storage = new InMemoryStorage();

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: Globals, useValue: {sessionStorage: testStorage}}
    ]
  }));

  beforeEach(() => {
    testStorage.clear();
    service = TestBed.get(AuthService);
  });

  describe('when logged in =>', () => {
    beforeEach(() => {
      testStorage.setItem('username', JSON.stringify('jane-doe'));
    });

    it('detects user as such', () => {
      expect(service.isLoggedIn()).toBeTruthy('should be logged in');
    });
  });

  describe('when not logged in =>', () => {

    it('detects user as such', () => {
      expect(service.isLoggedIn()).toBeFalsy('should not be logged in');
    });
  });

  describe('when logging in =>', () => {

    it('persists username', () => {
      service.logIn('toto');

      expect(service.isLoggedIn()).toBeTruthy('should be logged in');
      expect(JSON.parse(testStorage.getItem('username'))).toEqual('toto');
    });
  });

  describe('when logging out =>', () => {
    beforeEach(() => {
      testStorage.setItem('username', JSON.stringify('jane-doe'));
    });

    it('deletes the persisted username', () => {
      service.logOut();

      expect(service.isLoggedIn()).toBeFalsy('should be logged out');
      expect(testStorage.getItem('username')).toBeNull();
    });
  });
});

