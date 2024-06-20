import { UUID } from "crypto";

export interface Person {
    id: UUID;
    firstName: string;
    lastName: string;
}
