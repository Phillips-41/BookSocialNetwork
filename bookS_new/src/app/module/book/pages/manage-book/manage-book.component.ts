import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {BookRequest} from "../../../../services/models/book-request";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BookService} from "../../../../services/services/book.service";
import {BookResponse} from "../../../../services/models/book-response";

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit{
  errorMsg:Array<string>=[];
  selectedBookCover:any;
  selectedPicture: string|undefined;
  bookRequest: BookRequest={
  authorName: '',
  isbn: '',
  synopsis: '',
  title: ''
};
  constructor(private bookService:BookService,
              private router:Router,
              private activatedRoute:ActivatedRoute
  ) {
  }

  ngOnInit(): void {
       const bookId = this.activatedRoute.snapshot.params['book-id'];

       if(bookId){
         this.bookService.findByBookId({
           'book-id': bookId
         }).subscribe({
           next:(book:BookResponse):void=>{
             this.bookRequest={
               id: book.id,
               authorName: book.authorName as string,
               isbn: book.isbn as string,
               synopsis: book.synopsis as string,
               title:book.title as string,
               shareable:book.shareable
             }
             if(book.cover){
               this.selectedPicture='data:image/jpg;base64,'+book.cover;
             }
           }
         })
       }

    }

  onFileSelected(event: any) {
    this.selectedBookCover=event.target.files[0];
    console.log(this.selectedBookCover);
    if(this.selectedBookCover){
      const reader:FileReader = new FileReader();
      reader.onload=():void=>{
        this.selectedPicture=reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.savebook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId) => {
        this.bookService.uploadBookCoverPicture({
          'book-id': bookId,
          body: {
            file: this.selectedBookCover
          }
        }).subscribe({
          next: () => {
            this.router.navigate(['/books/my-books']);
          }
        });
      },
      error: (err) => {
        console.log(err.error);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }
}
