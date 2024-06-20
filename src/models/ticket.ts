import { UUID } from "crypto";
import { Person } from "./person";
import { Board } from "./board";

export interface Ticket {
    id: UUID;
    title: string;
    description: string;
    status: 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
    createdAt: Date;
    dueDate: Date;
    updatedAt: Date;
    assignee: Person;
    board: Board;
}
