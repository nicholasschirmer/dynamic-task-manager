import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Person } from '../models/person';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends RxState<Person[]>{

  readonly people$ = this.select().pipe(
    map(people => Object.values(people))
  );

  constructor() { 
    super();
  }

  addPerson$(person: Person) {
    this.set(people => ({ ...people, [Object.values(people).length]: person }));
  }

  editPerson$(people: Person[]) {
    this.set(people);
  }

  removePerson$(person: Person) {
    const tempPeople = this.get();
    for (const key in tempPeople) {
      if (tempPeople[key].id === person.id) {
        delete tempPeople[key];
      }
    }
    this.set(tempPeople);
  }
}
