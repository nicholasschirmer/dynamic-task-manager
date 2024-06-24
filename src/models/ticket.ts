import { Person } from "./person";
import { Board } from "./board";

export interface Ticket {
    id: string;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    createdAt: Date;
    dueDate: Date;
    assignee: Person | null;
    board: Board | null;
}
