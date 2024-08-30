import { Injectable } from '@angular/core';
import { IBaseService } from './base';
import { DataService } from './data.service';
import { base_url } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { GetCustomers, StoreCustomers, UpdateCustomers } from '../types'

@Injectable({
  providedIn: 'root'
})
export class CustomersService implements IBaseService {
  constructor(
    private dataService: DataService
  ) { }
  
  index<GetCustomers>(): Observable<GetCustomers[]> {
    const url = `${base_url}/customers`;
    return this.dataService.getList<GetCustomers>(url);
  }
  store<StoreCustomers>(data: StoreCustomers): Observable<StoreCustomers> {
    const url = `${base_url}/customers`;
    return this.dataService.post<StoreCustomers>(url, data);
  }
  update<UpdateCustomers>(id: string, data: UpdateCustomers): Observable<UpdateCustomers> {
    const url = `${base_url}/customers/${id}`;
    return this.dataService.put<UpdateCustomers>(url, data);
  }
  find<GetCustomers>(id: string): Observable<GetCustomers> {
    const url = `${base_url}/customers/${id}`;
    return this.dataService.get<GetCustomers>(url);
  }
  remove(id: string) {
    const url = `${base_url}/customers/${id}`;
    return this.dataService.delete(url);
  }
}
