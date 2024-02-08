import { Component, OnInit } from '@angular/core'
import { AssetsService } from '../../../services/assets'
import { Asset } from '../../../shared/asset'

@Component({
  selector: 'app-assets-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  collection: Array<Asset> = []

  portfolioSelected: string = ''
  ownerSelected: string = ''
  searchTerm: string = ''

  displayedColumns: Array<string> = ['UUID', 'portfolio', 'owner', 'origin', 'actions']

  constructor(private assets: AssetsService) { }


  ngOnInit(): void {
    this.retrieveList()
  }

  public orderList(): void {
    this.collection.sort(function (a, b): number { return b.timestamp - a.timestamp })
  }

  filterByPortfolio(event: string): void {
    this.portfolioSelected = event

    this.retrieveList()
  }

  filterByOwner(event: string): void {
    this.ownerSelected = event

    this.retrieveList()
  }

  filterByTerm(event: string): void {
    this.searchTerm = event

    this.retrieveList()
  }

  retrieveList(): void {
    this.assets.list(this.searchTerm.trim(), this.portfolioSelected, this.ownerSelected).subscribe(data => {
      this.collection = data.payload as Array<Asset>
    })

    this.orderList()
  }

}
