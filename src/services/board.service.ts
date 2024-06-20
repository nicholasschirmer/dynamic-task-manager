import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Board } from '../models/board';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends RxState<Board[]> {

  readonly boards$ = this.select().pipe(
    map(boards => Object.values(boards))
  );

  constructor() {
    super();

    this.set(Object.values([
      { id: uuidv4(), name: 'Backlog', createdAt: new Date() },
    ]));

  }

  addBoard$(board: Board) {
    this.set(boards => ({ ...boards, [Object.values(boards).length]: board }));
  }

  editBoard$(boards: Board[]) {
    console.log(boards);
    
    this.set(boards);
  }

  removeBoard$(board: Board) {
    const tempboards = this.get();
    for (const key in tempboards) {
      if (tempboards[key].id === board.id) {
        delete tempboards[key];
      }
    }
    this.set(tempboards);
    }
}
