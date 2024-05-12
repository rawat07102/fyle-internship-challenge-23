import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input({ required: true }) lastPage: number = 1;
  @Input({ required: true }) page: number = 1;

  @Output() pageChange = new EventEmitter();

  setPage(page: number) {
    this.pageChange.emit(page);
  }

  prevPage() {
    if (this.page > 1) {
      this.pageChange.emit(this.page - 1);
    }
  }

  nextPage() {
    if (this.page < this.lastPage) {
      this.pageChange.emit(this.page + 1);
    }
  }
}
