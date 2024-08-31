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

  store<StoreCustomers>(data: StoreCustomers, params: any): Observable<StoreCustomers> {
    const url = `${base_url}/bills/${params.customerId}`;
    return this.dataService.post<StoreCustomers>(url, data);
  }
  update<UpdateBills>(id: string, data: UpdateBills, params: any): Observable<UpdateBills> {
    const url = `${base_url}/bills/${params.customerId}/${id}`;
    return this.dataService.put<UpdateBills>(url, data);
  }
  find<GetBills>(id: string, params: any): Observable<GetBills> {
    const url = `${base_url}/bills/${params.customerId}/${id}`;
    return this.dataService.get<GetBills>(url);
  }
  remove(id: string, params: any) {
    const url = `${base_url}/bills/${params.customerId}/${id}`;
    return this.dataService.delete(url);
  }
  
}
