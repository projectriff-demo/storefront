import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private redirectUrl: string;
  private loginSubject = new BehaviorSubject<string>(this.getLogin());

  constructor(private storageService: StorageService) {
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl || '';
  }

  logIn(username: string) {
    this.loginSubject.next(username);
    this.storageService.save('username', username);
  }

  logOut() {
    this.loginSubject.next(null);
    this.storageService.unset('username');
  }

  isLoggedIn() {
    return this.getLogin() !== null;
  }

  getLogin(): string {
    return this.storageService.get('username');
  }

  getLogin$(): Observable<string> {
    return this.loginSubject.asObservable();
  }
}
