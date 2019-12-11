import {Injectable} from '@angular/core';
import {StorageService} from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private redirectUrl: string;

  constructor(private storageService: StorageService) {
  }

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string {
    return this.redirectUrl || '';
  }

  logIn(username: string) {
    this.storageService.save('username', username);
  }

  logOut() {
    this.storageService.unset('username');
  }

  isLoggedIn() {
    return this.getLogin() !== null;
  }

  getLogin() {
    return this.storageService.get('username');
  }
}
