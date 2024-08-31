import { Observable } from "rxjs";

export interface IBaseService {
    index<T>(): Observable<T[]>;
    store<T>(data: T, params: {}): Observable<T>;
    update<T>(id: string, data: T, params: {}): Observable<T>;
    find<T>(id: string, params: {}): Observable<T>;
}