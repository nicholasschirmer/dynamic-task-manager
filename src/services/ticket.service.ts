import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { Ticket } from '../models/ticket';
import { map } from 'rxjs';
import { Board } from '../models/board';

@Injectable({
  providedIn: 'root'
})
export class TicketService extends RxState<Ticket[]> {

  tickets$ = this.select().pipe(map(tickets => Object.values(tickets))
  );

  priorityOrder: Record<string, number> = {
    LOW: 0,
    MEDIUM: 1,
    HIGH: 2
  };

  constructor() {
    super();

    // defualt test ticket with no board as you cannot initialize a ticket with a board that does not exist
    // this.set([{ id: uuidv4(), title: 'First Ticket', description: 'This is the first ticket', status: 'PENDING', priority: 'LOW', createdAt: new Date(), dueDate: new Date(), assignee: null, board: null }]);
  }

  getTicketsForBoard$(board: Board) {
    return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.board === board)));
  }

  getTicketsForColumn$(board: Board, column: string, sort: string) {
    
    switch (sort) {
      case '': {
        return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.board === board && ticket.status === column)));
        break;
      }
      case 'priority': {
        console.log(sort);
        return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.board === board && ticket.status === column).sort((a, b) => this.priorityOrder[b.priority] - this.priorityOrder[a.priority])));
        break;
      }
      case 'dueDate': {
        return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.board === board && ticket.status === column).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())));
        break;
      }
      default: {
        return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.board === board && ticket.status === column)));
        break;
      }
    }
  }

  getTicketForStatus$(status: 'PENDING' | 'IN_PROGRESS' | 'DONE', sort: string) {
    
    switch (sort) {
      case '': {
        return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.status === status)));
        break;
      }
      case 'priority': {
        console.log(sort);
        return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.status === status).sort((a, b) => this.priorityOrder[b.priority] - this.priorityOrder[a.priority])));
        break;
      }
      case 'dueDate': {
        return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.status === status).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())));
        break;
      }
      default: {
        return this.select().pipe(map(tickets => Object.values(tickets).filter(ticket => ticket.status === status)));
        break;
      }
    }
  }

  getBacklogTicketByColumn$(column: string) {
    return this.select().pipe(map(ticket => Object.values(ticket).filter(t => t.status === column && (t.board === null || t.board.name === 'Backlog')).sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())));
  }

  addTicket$(ticket: Ticket) {
    this.set(tickets => ({ ...tickets, [Object.values(tickets).length]: ticket }));
  }

  editTicket$(ticket: Ticket) {

    const tempTickets = this.get();
    for (const key in tempTickets) {
      if (tempTickets[key].id === ticket.id) {
        tempTickets[key] = ticket;
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
