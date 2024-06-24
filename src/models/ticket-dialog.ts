import { Ticket } from "./ticket";

export interface TicketDialog {
    ticket: Ticket;
    mode: 'add' | 'edit';
}
