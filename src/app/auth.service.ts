import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl + "api/login"; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {

    const body = { username, password };

    return this.http.post(this.apiUrl, body, { withCredentials: true });
  }
}
