import {TestBed} from '@angular/core/testing';

import {StorageService} from './storage.service';
import {Globals} from '../globals';
import {InMemoryLocalStorage} from './in-memory-storage';


describe('StorageService', () => {

  let inMemoryLocalStorage: InMemoryLocalStorage;
  let service: StorageService;

  beforeEach(() => {
    inMemoryLocalStorage = new InMemoryLocalStorage();
    return TestBed.configureTestingModule({
      providers: [
        {provide: Globals, useValue: {localStorage: inMemoryLocalStorage}},
      ]
    });
  });

  beforeEach(() => {
    service = TestBed.get(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('saves items under specified key', () => {
    const value = {key: 'value', key2: 42};

    service.save('foo', value);

    expect(inMemoryLocalStorage.getItem('foo')).toEqual(JSON.stringify(value));
  });

  it('gets null for unregistered items', () => {
    const notFound = service.get('bar');

    expect(notFound).toBeNull();
  });

  it('gets values', () => {
    const value = {jane: 'doe'};
    inMemoryLocalStorage.setItem('baz', JSON.stringify(value));

    const result = service.get('baz');

    expect(result).toEqual(value);
  });

});
