import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-item',
  imports: [],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.css'
})
export class BookItemComponent {
  @Input() book: any; 
}
