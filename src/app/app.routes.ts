import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { NotemarksComponent } from './notemarks/notemarks.component';
import { ProfileComponent } from './profile/profile.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'books', component: BooksComponent },
    { path: '', component: HomeComponent },
    { path: 'book', component: BookComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'notemarks', component: NotemarksComponent },
];
