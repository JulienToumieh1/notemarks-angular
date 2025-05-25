import { Component } from '@angular/core';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [HttpClientModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any = {}; 
  token: string | null = localStorage.getItem('token');
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (this.token) {
      this.loadUserProfile(); 
    } else {
      this.router.navigate(['/login']); 
      console.error('Token not found');
    }
  }

  loadUserProfile(): void {
    const params = new HttpParams()
        .set('token', String(this.token));

    this.http.post<any>(environment.apiUrl + "/api/profile/", params).subscribe(data => {
      if (data.username) {
        this.user = {
          username: data.username,
          email: data.email,
          date_joined: data.date_joined
        }; 
      } else {
        console.error('User data not found');
      }
    }, error => {
      console.error('Error fetching user profile:', error);
    });
  }

  logout(): void {
    localStorage.removeItem('token');

    this.router.navigate(['/login']); 

    console.log('User logged out');
  }
}
