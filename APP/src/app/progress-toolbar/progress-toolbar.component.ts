import { Component, OnInit } from '@angular/core';
import { Token } from '../../infraestructure/token';

@Component({
  selector: 'app-progress-toolbar',
  templateUrl: './progress-toolbar.component.html',
  styleUrls: ['./progress-toolbar.component.scss']
})

export class ProgressToolbarComponent{
  long:number = 100
  timeExpired:number =300
  secondDivided:number= 1/8
  secondDividedInMs:number=this.secondDivided*1000

  constructor() { 
    setInterval(()=>{
      this.long -= (this.long/this.timeExpired)*this.secondDivided   
    }, this.secondDividedInMs)
  }

  isValid(): boolean {
    return Token.isValid()
  }
}
