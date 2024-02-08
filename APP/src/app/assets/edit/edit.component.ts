import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetsService } from '../../../services/assets';
import { Asset } from '../../../shared/asset';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})

export class EditComponent extends FormComponent implements OnInit {

  UUID: string = ''

  constructor(private route: ActivatedRoute, private router: Router, private asset: AssetsService) {
    super(router, asset)
  }

  assetUpdated(): void {
    this.router.navigate(['assets-list'])
  }

  sendUpdates(): void {
    this.asset.edit(this.UUID, this.id_owner, this.id_origin, this.id_portfolio)
      .subscribe(data => {
        if (data.status == 'ok') {
          this.router.navigate(['assets-list'])
        }
        if (data.status == 'ko') {
          this.invalidAsset = true
          this.error = data.message!
        }
      })
  }

  ngOnInit(): void {
    this.UUID = this.route.snapshot.paramMap.get('id') || 'No hay id'

    this.asset.retrieve(this.UUID).subscribe((data) => {
      const asset: Asset = data.payload as Asset

      if (data.status == 'ok') {
        this.id_owner = asset.owner
        this.id_origin = asset.origin
        this.id_portfolio = asset.portfolio
      }

      if (data.status == 'ko') {
        this.router.navigate(['assets-list'])
      }
    })
  }
}
