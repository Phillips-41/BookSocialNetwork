import {Component, OnInit} from '@angular/core';
import {BookCardComponent} from "../../components/book-card/book-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {PageResponseBookResponse} from "../../../../services/models/page-response-book-response";
import {Router} from "@angular/router";
import {BookService} from "../../../../services/services/book.service";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-my-books',
  standalone: true,
    imports: [
        BookCardComponent,
        NgForOf,
        NgIf
    ],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent  implements OnInit {
  size: number=5;
  page: number=0;
  pages: any = [];
  bookResponse:PageResponseBookResponse={}

  constructor(
    private router: Router,
    private bookService: BookService,
  ) {
  }
  ngOnInit(): void {
    this.findAllBooks();
    console.log(this.bookResponse);
  }

  private findAllBooks() {
    this.bookService.findAllBooksByOwner({
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

  archiveBook(book: BookResponse) {
    this.bookService.updateArchivedStatus({
      'book-id':book.id as number
    }).subscribe({
      next:()=> {
        book.archived=!book.archived;
      }
    });
  }

  shareBook(book: BookResponse) {
    console.log("book is shared")
    this.bookService.updateShareableStatus({
      'book-id':book.id as number
    }).subscribe({
      next:()=> {
        console.log("book is shared")
        book.shareable=!book.shareable;
      }
    });
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books','manage',book.id])
  }
}
