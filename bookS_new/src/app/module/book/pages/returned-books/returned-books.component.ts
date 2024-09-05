import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {BookService} from "../../../../services/services/book.service";
import {FeedbackService} from "../../../../services/services/feedback.service";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BookResponse} from "../../../../services/models/book-response";
import {FeedBackRequest} from "../../../../services/models/feed-back-request";
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
  feedbackRequest: FeedBackRequest={bookId: 0, comment: "", note: 0};
  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }

  findAllBorrowedBooks() {
    this.bookService.findAllBorrowedBooks({
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
    this.findAllBorrowedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBooks();
  }

  gotToPage(pageIndex: any) {
    this.page=pageIndex;
    this.findAllBorrowedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBooks();
  }

  goToLastPage() {
    this.page=this.returnedBooks.totalPages as number-1;
    this.findAllBorrowedBooks();
  }
  get isLastPage():boolean{
    return this.page==this.returnedBooks.totalPages as number-1;
  }

  approveBookReturn(book: BorrowedBookResponse) {
    if(!book.returned){
      return;
    }
  }
}
