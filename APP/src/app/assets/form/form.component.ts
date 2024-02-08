import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from '../../../services/assets';

@Component({
  selector: 'app-assets-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent {
  id_owner: string = ''
  id_origin: string = ''
  id_portfolio: string = ''
  invalidAsset: boolean = false
  error = ''

  constructor(private routes: Router, private assets: AssetsService) { }

  filterOwner(event: Event): string {
    const inputOwner = event.target as HTMLInputElement
    const value: string = inputOwner.value
    this.id_owner = value.trim()
    return this.id_owner
  }

  filterOrigin(event: Event): string {
    const inputOwner = event.target as HTMLInputElement
    const value: string = inputOwner.value
    this.id_origin = value.trim()
    return this.id_origin
  }

  filterPortfolio(event: Event): string {
    const inputOwner = event.target as HTMLInputElement
    const value: string = inputOwner.value
    this.id_portfolio = value.trim()
    return this.id_portfolio
  }

  incomplete(): boolean {
    return (this.id_owner == '') || (this.id_origin == '')
  }

  send(): void {
    this.assets.create(this.id_owner, this.id_origin, this.id_portfolio)
      .subscribe(data => {

        if (data.status == 'ok') {
          this.routes.navigate(['assets-list'])
        }
        if (data.status == 'ko') {
          this.error = data.message!
          this.invalidAsset = true
        }
      })
  }

  enterKeyPressed(event: any) {
    if (event.key === "Enter") {
      this.send()
      return true
    }
    return false
  }
}