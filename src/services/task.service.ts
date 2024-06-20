import { Injectable, signal } from '@angular/core';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tickets = signal<Ticket[]>([] as Ticket[]);

  constructor() {
    console.log('TaskService created');
    
  }
}
