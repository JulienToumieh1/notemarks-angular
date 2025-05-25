import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { BookItemComponent } from '../book-item/book-item.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotemarkItemComponent } from '../notemark-item/notemark-item.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-book',
  imports: [BookItemComponent, HttpClientModule, CommonModule, RouterModule, NotemarkItemComponent, FormsModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  bookId: string = '16';
  book: any;
  tags: any[] = [];
  notemarks: any[] = [];
  search: string = '';
  tagFilter: number | null = null;
  sort_direction: string = 'asc';
  token: string | null = localStorage.getItem('token'); 

  showNotemarkModal: boolean = false;
  showEditBookModal: boolean = false;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    if (this.token) {
      this.route.queryParams.subscribe(params => {
        const bookID = params['bookID'];
        if (bookID) {
          this.bookId = bookID
          this.loadBook();
        } else {
          console.error('No bookID found in query parameters');
        }
      });
    } else {
      this.router.navigate(['/login']); 
      console.error('Token not found');
    }
  }
  

  loadBook(): void {

    const params = new HttpParams()
        .set('token', String(this.token))
        .set('bookid', this.bookId)
        .set('tag', String(this.tagFilter))
        .set('search', this.search)
        .set('sort', this.sort_direction);


    this.http.post<any>(environment.apiUrl + "api/book/", params).subscribe(data => {
      this.book = data.book;
      this.notemarks = data.notemarks;
      this.tags = data.tags

      console.log(data)

    }, error => {
      console.error('Error fetching books:', error);
    });
  }

  createNotemarkPopup(state: boolean): void {
    this.showNotemarkModal = state;  
  }

  createNotemark(form: any): void {
    console.log(form.value);

    const params = new HttpParams()
      .set('token', String(this.token))
      .set('book_id', this.bookId || '') 
      .set('chapter', form.value.chapter || '')  
      .set('color', form.value.color || '')      
      .set('contents', form.value.contents || '')
      .set('favourite', form.value.favourite ? 'true' : 'false')  
      .set('page', form.value.page || '')      
      .set('title', form.value.title || '')
      .set('tags', form.value.tags || []);     



    this.http.post<any>(environment.apiUrl + "api/create/notemark/", params).subscribe(data => {
      this.showNotemarkModal = false;
      this.loadBook()
    }, error => {
      console.error('Error creating category:', error);
    });
  }

  editBookPopup(state: boolean): void {
    this.showEditBookModal = state; 
  }

  editBook(form: any): void {
    console.log(form.value);

    const params = new HttpParams()
      .set('token', String(this.token))
      .set('book_id', this.bookId || '')   
      .set('title', form.value.title || '')
      .set('authors', form.value.authors || '') 
      .set('description', form.value.description || ''); 



    this.http.post<any>(environment.apiUrl + "api/edit/book/", params).subscribe(data => {
      this.showEditBookModal = false;
      this.loadBook()
    }, error => {
      console.error('Error creating category:', error);
    });
  }

  toggleSort(): void {
    this.sort_direction = this.sort_direction === 'asc' ? 'desc' : 'asc';
    this.loadBook(); 
  }

  onTagChange(tagId: number): void {
    this.tagFilter = this.tagFilter === tagId ? null : tagId;
    this.loadBook(); 
  }

  onSearchChange(searchTerm: string): void {
    this.search = searchTerm;
    this.loadBook(); 
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

  
  deleteBook(id: any): void {
    console.log(id);

    const params = new FormData();
    params.append('book_id', String(id));

    this.http.post<any>(environment.apiUrl + "api/delete/book/", params).subscribe(data => {
      console.log(data)
      this.router.navigate(['/books']);
    }, error => {
      console.error('Error creating book:', error);
    });
  }
}
