import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input() rating: number = 0;
  @Output() ratingClicked: EventEmitter<number> = new EventEmitter<number>();
  maxRating: number = 5;

  get fullStars(): number {
    return Math.floor(this.rating);
  }

  get hasHalfStar(): boolean {
    return this.rating % 1 !== 0;
  }

  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating);
  }
}
