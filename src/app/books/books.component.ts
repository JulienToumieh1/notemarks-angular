import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookItemComponent } from '../book-item/book-item.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-books',
  imports: [BookItemComponent, HttpClientModule, CommonModule, RouterModule, FormsModule],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: any[] = [];
  categories: any[] = [];
  search: string = '';
  categoryFilter: number | null = null;
  sort_direction: string = 'asc';
  token: string | null = localStorage.getItem('token');  

  showCategoryModal: boolean = false;
  showBookModal: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    if (this.token) {
      this.loadBooks();
    } else {
      this.router.navigate(['/login']); 
      console.error('Token not found');
    }
  }


  loadBooks(): void {

    const params = new HttpParams()
        .set('token', String(this.token))
        .set('category', String(this.categoryFilter))
        .set('search', this.search)
        .set('sort', this.sort_direction);


    this.http.post<any>(environment.apiUrl + "api/books/", params).subscribe(data => {
      this.books = data.books;
      this.categories = data.categories;


    }, error => {
      console.error('Error fetching books:', error);
    });
  }

  createCategoryPopup(state: boolean): void {
    this.showCategoryModal = state; 
  }

  createCategory(form: any): void {
    console.log(form.value);

    const params = new HttpParams()
        .set('token', String(this.token))
        .set('category_name', form.value.category_name)
        .set('category_color', form.value.category_color);

    
    this.http.post<any>(environment.apiUrl + "api/create/category/", params).subscribe(data => {
      this.showCategoryModal = false;
      this.loadBooks( )
    }, error => {
      console.error('Error creating category:', error);
    });

  }

  createBookPopup(state: boolean): void {
    this.showBookModal = state; 
  }

    
  coverImageFile: File | null = null;
  bookPdfFile: File | null = null;

  onFileChange(event: any, type: string): void {
    const file = event.target.files[0];  
    if (file) {
      if (type === 'cover_image') {
        this.coverImageFile = file;
      } else if (type === 'book_pdf') {
        this.bookPdfFile = file;
      }
      console.log(`${type} selected:`, file);
    }
  }

  createBook(form: any): void {
  
    const formData = new FormData();
    
    formData.append('token', String(this.token));
    formData.append('author_email', form.value.author_email);
    formData.append('authors', form.value.authors);
    formData.append('description', form.value.description);
    formData.append('favourite', form.value.favourite ? 'true' : 'false');
    formData.append('pages', form.value.pages);
    formData.append('rating', form.value.rating);
    formData.append('status', form.value.status);
    formData.append('title', form.value.title);

    
    if (this.coverImageFile) {
      formData.append('cover_image', this.coverImageFile, this.coverImageFile.name);
    } else {
      console.error('Cover image is not a valid file:', this.coverImageFile);
    }

    if (this.bookPdfFile) {
      formData.append('book_pdf', this.bookPdfFile, this.bookPdfFile.name);
    } else {
      console.error('Book PDF is not a valid file:', this.bookPdfFile);
    }

   
    form.value.categories.forEach((category: any) => {
      formData.append('categories', category);
    });
 
    this.http.post<any>(environment.apiUrl + "api/create/book/", formData).subscribe(data => {
      this.showBookModal = false;
      this.loadBooks();
    }, error => {
      console.error('Error creating book:', error);
    });
  }
  

  toggleSort(): void {
    this.sort_direction = this.sort_direction === 'asc' ? 'desc' : 'asc';
    this.loadBooks();  
  }

  onCategoryChange(categoryId: number): void {
    this.categoryFilter = this.categoryFilter === categoryId ? null : categoryId;
    this.loadBooks(); 
  }

  onSearchChange(searchTerm: string): void {
    this.search = searchTerm;
    this.loadBooks();  
  }


  getQueryParams(categoryId: number, search: string, sortDirection: string) {
    const params: any = {};

    if (categoryId) {
      params['category'] = categoryId;
    }

    if (search && search.trim()) {
      params['search'] = search;
    }

    if (sortDirection) {
      params['sort'] = sortDirection;
    }

    return params;
  }
}
