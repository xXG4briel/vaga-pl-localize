import { Status } from "./status";

export interface StoreBills {
    id?: string;
    description: string;
    dueDate: string;
    value: number;
    status?: Status;  
}