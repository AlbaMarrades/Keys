import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AssetsService } from '../../../services/assets';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})

export class FilterComponent implements OnInit {

  @Input() filteredList: Array<string> = []
  @Input() searchTerm: string = ""
  @Input() placeholderTerm: string = ""
  @Output() onSelection: EventEmitter<string> = new EventEmitter()
  value: string = ''

  constructor(private assets: AssetsService) { }

  ngOnInit(): void {
    this.assets.doFilter(this.searchTerm).subscribe(data => {
      this.filteredList = data.payload as Array<string>
    })
  }

  selectedValue(): void {
    this.onSelection.emit(this.value)
  }
}
