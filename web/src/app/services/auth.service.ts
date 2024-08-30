import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { base_url } from 'src/environments/environment';
import { map } from 'rxjs';

type Login = {
  email: string;
  password: string;
}
type LoginResponse = {
  token: string;
}
type Register = {
  name: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private dataService: DataService
  ) { }

  signOut(data: Register) {
    const url = `${base_url}/auth/signout`;
    return this.dataService.post<any>(url, data);
  }

  signIn(data: Login) {
    const url = `${base_url}/auth/signin`;
    return this.dataService.post<any>(url, data).pipe((
      map((response: LoginResponse) => {
        localStorage.setItem('token', response.token);
        return response;
      })
    ));
  }
  
}
