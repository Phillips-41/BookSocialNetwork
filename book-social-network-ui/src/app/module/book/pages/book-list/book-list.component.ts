import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {BookService} from "../../../../services/services/book.service";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";

import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    FormsModule, CommonModule, BookCardComponent
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit {
   size: number=5;
   page: number=0;
   pages: any = [];
  bookResponse:PageResponseBookResponse={};
   message: string='';
  level: 'success' |'error' = 'success';
  constructor(
    private router: Router,
    private bookService: BookService,
  ) {
  }
    ngOnInit(): void {
       this.findAllBooks();
    }

  private findAllBooks() {
    this.bookService.findAllBooks({
      page: this.page,
      size:this.size
    }).subscribe({
      next: (books) => {
        this.bookResponse = books;
        this.pages = Array(this.bookResponse.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    })
  }

  goToFirstPage() {
    this.page=0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  gotToPage(pageIndex: any) {
    this.page=pageIndex;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page=this.bookResponse.totalPages as number-1;
    this.findAllBooks();
  }
  get isLastPage():boolean{
    return this.page==this.bookResponse.totalPages as number-1;
  }

  borrowBook(book: BookResponse) {
    this.message='';
    this.bookService.borrowBook({
      'book-id':book.id as number
    }).subscribe({
      next:()=> {
        this.level='success';
        this.message = 'Book successfully added to your list';
      },
      error: (err) => {
        console.log(err);
        this.level = 'error';
        this.message = err.error.error;
      }
    });
  }
}
