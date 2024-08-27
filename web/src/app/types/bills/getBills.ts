import { Status } from "./status";

export interface GetBills {
    id: string;
    description: string
    dueDate: string;
    value: number;
    status: Status;    
}