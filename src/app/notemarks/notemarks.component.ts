import { Component, OnInit } from '@angular/core';
import { BookItemComponent } from '../book-item/book-item.component';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotemarkItemComponent } from '../notemark-item/notemark-item.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-notemarks',
  imports: [NotemarkItemComponent, HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './notemarks.component.html',
  styleUrl: './notemarks.component.css'
})
export class NotemarksComponent implements OnInit {
  notemarks: any[] = [];
  tags: any[] = [];
  search: string = '';
  tagFilter: number | null = null;
  sort_direction: string = 'asc';
  token: string | null = localStorage.getItem('token'); 

  showTagModal: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (this.token) {
      this.loadNotemarks();
    } else {
      this.router.navigate(['/login']); 
      console.error('Token not found');
    }
  }

  loadNotemarks(): void {
    const params = new HttpParams()
        .set('token', String(this.token))
        .set('tag', String(this.tagFilter))
        .set('search', this.search)
        .set('notemarks_sort', this.sort_direction);


    this.http.post<any>("http://localhost:8000/api/notemarks/", params).subscribe(data => {
      this.notemarks = data.notemarks;
      this.tags = data.tags;
    }, error => {
      console.error('Error fetching notemarks:', error);
    });
  }


  createTagPopup(state: boolean): void {
    this.showTagModal = state;  
  }

  createTag(form: any): void {
    console.log(form.value);

    const params = new HttpParams()
        .set('token', String(this.token))
        .set('tag_name', form.value.tag_name)
        .set('tag_color', form.value.tag_color);

    this.http.post<any>('http://localhost:8000/api/create/tag/', params).subscribe(data => {
      this.showTagModal = false;
      this.loadNotemarks( )
    }, error => {
      console.error('Error creating category:', error);
    });

  }

  toggleSort(): void {
    this.sort_direction = this.sort_direction === 'asc' ? 'desc' : 'asc';
    this.loadNotemarks(); 
  }

  onTagChange(tagId: number): void {
    this.tagFilter = this.tagFilter === tagId ? null : tagId;
    this.loadNotemarks();  
  }

  onSearchChange(searchTerm: string): void {
    this.search = searchTerm;
    this.loadNotemarks(); 
  }

  getQueryParams(tagId: number, search: string, sortDirection: string) {
    const params: any = {};

    if (tagId) {
      params['tag'] = tagId;
    }

    if (search && search.trim()) {
      params['search'] = search;
    }

    if (sortDirection) {
      params['notemarks_sort'] = sortDirection;
    }

    return params;
  }
}
