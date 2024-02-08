import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { InfoService } from '../../services/info'

@Component({
  selector: 'app-denomination',
  templateUrl: './denomination.component.html',
  styleUrls: ['./denomination.component.scss']
})

export class DenominationComponent implements OnInit {

  public denomination: string = 'No info yet'

  constructor(private infoService: InfoService, private myRouter: Router) { }

  getDenomination(): void {
    this.infoService.getName().subscribe(data => this.denomination = data)
  }

  ngOnInit(): void {
    this.getDenomination();
  }
}
