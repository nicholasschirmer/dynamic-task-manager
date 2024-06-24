import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Board } from '../models/board';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs';
import { TicketService } from './ticket.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService extends RxState<Board[]> {

  readonly boards$ = this.select().pipe(
    map(boards => Object.values(boards))
  );

  constructor(private ticketState: TicketService) {
    super();

    this.set(Object.values([
      { id: uuidv4(), name: 'Backlog', createdAt: new Date() },
    ]));

  }

  addBoard$(board: Board) {
    this.set(boards => ({ ...boards, [Object.values(boards).length]: board }));
  }

  editBoard$(boards: Board[]) {
    this.set(boards);
  }

  removeBoard$(board: Board) {
    this.ticketState.getTicketsForBoard$(board).subscribe(tickets => {
      for (const ticket of tickets) {
        this.ticketState.editTicket$({ ...ticket, board: null });
      }
    });
    
    const tempboards = this.get();
    for (const key in tempboards) {
      if (tempboards[key].id === board.id) {
        delete tempboards[key];
      }
    }
    this.set(tempboards);
  }
}
