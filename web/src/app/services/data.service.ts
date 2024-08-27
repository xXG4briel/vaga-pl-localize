import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpService: HttpClient) { }

  getList<T>(url: string) {
    return this.httpService.get<T[]>(url);
  }

  get<T>(url: string) {
    return this.httpService.get<T>(url);
  }

  post<T>(url: string, data: any) {
    return this.httpService.post<T>(url, data);
  }

  put<T>(url: string, data: any) {
    return this.httpService.put<T>(url, data);
  }

  delete(url: string) {
    return this.httpService.delete<boolean>(url);
  }
}
