import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-asset-actions',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class AssetActionsComponent {

  @Input() UUID: string = ''
  @Input() icon: string = ''
  @Input() path: string = ''

  constructor(private router: Router) { }

  goToPath(): void {
    this.router.navigate([`/${this.path}`, this.UUID]);
  }

}
