import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Ticket } from '../models/ticket';
import { map } from 'rxjs';
import { Board } from '../models/board';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends RxState<Ticket[]> {

  tickets$ = this.select().pipe(map(tickets => Object.values(tickets))
  );

  constructor() {
    super();

    this.set([{ id: uuidv4(), title: 'First Ticket', description: 'This is the first ticket', status: 'PENDING', priority: 'LOW', createdAt: new Date(), dueDate: new Date(), assignee: null, board: null }]);
  }

  getTicketsForBoard$(board: Board) {
    return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.board === board)));
  }

  getTicketsForColumn$(board: Board, column: string) {
    return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.board === board && ticket.status === column).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())));
  }

  getBacklogTicketByColumn$(column: string) {
    return this.select().pipe(map(ticket => Object.values(ticket).filter(t => t.status === column && (t.board === null || t.board.name === 'Backlog')).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())));
  }

  addTicket$(ticket: Ticket) {
    this.set(tickets => ({ ...tickets, [Object.values(tickets).length]: ticket }));
  }

  editTicket$(ticket: Ticket) {
    console.log(ticket);

    const tempTickets = this.get();
    for (const key in tempTickets) {
      if (tempTickets[key].id === ticket.id) {
        tempTickets[key] = ticket;
        console.log(key);

      }
    }
    this.set(tempTickets);
  }

  deleteTicket$(ticket: Ticket) {
    const tempTickets = this.get();
    for (const key in tempTickets) {
      if (tempTickets[key].id === ticket.id) {
        delete tempTickets[key];
      }
    }
    this.set(tempTickets);
  }
}
