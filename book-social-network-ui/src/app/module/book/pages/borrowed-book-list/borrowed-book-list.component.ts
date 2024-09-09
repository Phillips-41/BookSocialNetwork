import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PageResponseBorrowedBookResponse} from "../../../../services/models/page-response-borrowed-book-response";
import {BookService} from "../../../../services/services/book.service";
import {BookResponse} from "../../../../services/models/book-response";
import {BorrowedBookResponse} from "../../../../services/models/borrowed-book-response";
import {FormsModule} from "@angular/forms";
import {FeedBackRequest} from "../../../../services/models/feed-back-request";
import {RatingComponent} from "../../components/rating/rating.component";
import {RouterLink} from "@angular/router";
import {FeedbackService} from "../../../../services/services/feedback.service";

@Component({
  selector: 'app-borrowed-book-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    FormsModule,
    RatingComponent,
    RouterLink
  ],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit {
   page=0;
   size=5;
  pages: any = [];
  constructor(private bookService:BookService,
              private feedbackservice:FeedbackService
              ) {
  }
  borrowedBooks: PageResponseBorrowedBookResponse={};
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
        this.borrowedBooks = res;
        this.pages = Array(this.borrowedBooks.totalPages)
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
    this.page=this.borrowedBooks.totalPages as number-1;
    this.findAllBorrowedBooks();
  }
  get isLastPage():boolean{
    return this.page==this.borrowedBooks.totalPages as number-1;
  }


  returnBorrowedBook(borrowedBooks: BorrowedBookResponse) {
    this.selectedBook = borrowedBooks;
    this.feedbackRequest.bookId=borrowedBooks.id as number;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({
      'book-id':this.selectedBook?.id as number
    }).subscribe({
      next:()=> {
        if(withFeedback){
          this.giveFeedback();
        }
        this.selectedBook=undefined;
        this.findAllBorrowedBooks()
      }
    })
  }

  private giveFeedback() {
    this.feedbackservice.saveFeedBack({
      body:this.feedbackRequest
    }).subscribe({
      next:()=>{
      }
    })
  }
}
