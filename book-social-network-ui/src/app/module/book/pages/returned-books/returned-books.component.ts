import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {BookService} from "../../../../services/services/book.service";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BookResponse} from "../../../../services/models/book-response";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";

@Component({
  selector: 'app-returned-books',
  standalone: true,
    imports: [
        NgForOf,
        NgIf
    ],
  templateUrl: './returned-books.component.html',
  styleUrl: './returned-books.component.scss'
})
export class ReturnedBooksComponent implements OnInit{
  page=0;
  size=5;
  pages: any = [];
  constructor(private bookService:BookService
  ) {
  }
  returnedBooks: PageResponseBorrowedBookResponse={};
  selectedBook: BookResponse | undefined=undefined
  message: string='';
  level: string='success';

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page:this.page,
      size:this.size
    }).subscribe({
      next:(res):void =>{
        this.returnedBooks = res;
        this.pages = Array(this.returnedBooks.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    })
  };
  goToFirstPage() {
    this.page=0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }

  gotToPage(pageIndex: any) {
    this.page=pageIndex;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page=this.returnedBooks.totalPages as number-1;
    this.findAllReturnedBooks();
  }
  get isLastPage():boolean{
    return this.page==this.returnedBooks.totalPages as number-1;
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned){
      this.level='error';
      this.message="error book is not returned yet";
      return;
    }
    this.bookService.approveReturnBorrowBook({
      'book-id':book.id as number
    }).subscribe({
      next:(res):void =>{
        this.level='success';
        this.message="The book is returned";
        this.findAllReturnedBooks();
      }
    })
  }
}
