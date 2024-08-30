import { Injectable } from '@angular/core';
import { IBaseService } from './base';
import { Observable } from 'rxjs';
import { DataService } from './data.service';
import { base_url } from 'src/environments/environment';

import { GetBills, StoreCustomers, UpdateBills } from '../types';

@Injectable({
  providedIn: 'root'
})
export class BillsService implements IBaseService {

  constructor(
    private dataService: DataService
  ) { }
  getBills<GetBills>(customerId: string): Observable<GetBills[]> {
    const url = `${base_url}/bills/${customerId}`;
    return this.dataService.getList<GetBills>(url);
  } 
  
  index<T>(): Observable<T[]> {
    throw new Error('Method not implemented.');
  }

  store<StoreCustomers>(data: StoreCustomers): Observable<StoreCustomers> {
    const url = `${base_url}/bills`;
    return this.dataService.post<StoreCustomers>(url, data);
  }
  update<UpdateBills>(id: string, data: UpdateBills): Observable<UpdateBills> {
    const url = `${base_url}/bills/${id}`;
    return this.dataService.put<UpdateBills>(url, data);
  }
  find<GetBills>(id: string): Observable<GetBills> {
    const url = `${base_url}/bills/${id}`;
    return this.dataService.get<GetBills>(url);
  }
  remove(id: string) {
    const url = `${base_url}/bills/${id}`;
    return this.dataService.delete(url);
  }
  
}
