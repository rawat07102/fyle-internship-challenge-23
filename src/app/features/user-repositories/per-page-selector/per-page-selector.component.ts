import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-per-page-selector',
  templateUrl: './per-page-selector.component.html',
})
export class PerPageSelectorComponent {
  @Input({ required: true }) perPage: number = 10;
  @Output() perPageChange = new EventEmitter<number>();

  changePerPage() {
    this.perPageChange.emit(this.perPage);
  }
}
