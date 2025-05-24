import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login(form: NgForm) {
    if (form.valid) {
      const { username, password } = form.value;

     
      const params = new HttpParams()
        .set('username', username)
        .set('password', password);


      this.http.post('http://localhost:8000/api/login/', params, { 
        withCredentials: true,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).subscribe(
        (response: any) => {
          console.log('Login Successful:', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/books']);  
        },
        (error) => {
          console.error('Login Failed:', error);
          this.errorMessage = 'Invalid username or password.';
        }
      );
    } else {
      this.errorMessage = 'Please fill in both username and password.';
    }
  }
}
