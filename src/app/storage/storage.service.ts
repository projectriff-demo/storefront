import {Injectable} from '@angular/core';
import {Globals} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private sessionStorage: Storage;

  constructor(globals: Globals) {
    this.sessionStorage = globals.sessionStorage;
  }

  get(key: string): any {
    return JSON.parse(this.sessionStorage.getItem(key));
  }

  save(key: string, value: any) {
    this.sessionStorage.setItem(key, JSON.stringify(value));
  }

  unset(key: string) {
    this.sessionStorage.removeItem(key);
  }
}
