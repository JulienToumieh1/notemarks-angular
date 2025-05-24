import { NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notemark-item',
  imports: [NgStyle, HttpClientModule],
  templateUrl: './notemark-item.component.html',
  styleUrl: './notemark-item.component.css'
})
export class NotemarkItemComponent {
  @Input() notemark: any;

  constructor(private http: HttpClient) {}

  
  deleteNotemark(id: any): void {
    console.log(id);
  
    const params = new FormData();
    params.append('notemark_id', String(id));


    this.http.post<any>('http://localhost:8000/api/delete/notemark/', params).subscribe(data => {
      console.log(data);
    
      window.location.reload(); 
    }, error => {
      console.error('Error deleting notemark:', error);
    });
  }
  
}
