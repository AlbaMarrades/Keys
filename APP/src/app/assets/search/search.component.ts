import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent  {
  @Output() onClick = new EventEmitter()
  searchTerm:string = ''
  
  search(): void {
    this.onClick.emit(this.searchTerm)  
  }
  
}
