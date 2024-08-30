import { Status } from "./status";

export interface UpdateBills {
    id: number;
    description: string;
    dueDate: string;
    value: number;
    status: Status;  
}