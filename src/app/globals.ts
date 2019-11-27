import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  localStorage: Storage = window.localStorage;
}
