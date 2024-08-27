import { Status } from "./status";

export interface UpdateBills {
    id: number;
    name: string;
    dueDate: string;
    value: number;
    status: Status;  
}