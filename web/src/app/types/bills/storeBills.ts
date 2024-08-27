import { Status } from "./status";

export interface StoreBills {
    id?: string;
    name: string;
    dueDate: string;
    value: number;
    status?: Status;  
}