import { Observable } from "rxjs";

export interface IBaseService {
    index<T>(): Observable<T[]>;
    store<T>(data: T): Observable<T>;
    update<T>(id: string, data: T): Observable<T>;
    find<T>(id: string): Observable<T>;
}