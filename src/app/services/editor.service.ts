import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditorService {
  review: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor() {}

  showReview() {
    return this.review.next(true);
  }

  hideReview() {
    return this.review.next(false);
  }

  toggleReview() {
    let value = this.review.getValue();
    return this.review.next(!value);
  }
}
