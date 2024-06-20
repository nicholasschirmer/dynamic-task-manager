import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends RxState<Person[]> {

  constructor() {
    super();

    this.set([]);
  }
}
