import {Injectable} from '@angular/core';
import {Globals} from '../globals';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private localStorage: Storage;

  constructor(globals: Globals) {
    this.localStorage = globals.localStorage;
  }

  get(key: string): any {
    return JSON.parse(this.localStorage.getItem(key));
  }

  save(key: string, value: any) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }
}
