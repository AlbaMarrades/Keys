import { Component } from '@angular/core';

type Item = {
  option: string
  icon: string
  route: string
  requiredRoles: string
}

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent {

  items: Array<Item> = [
    { option: 'home', icon: 'home', route: '', requiredRoles: 'member,admin' },
    { option: 'addAsset', icon: 'note_add', route: 'new-asset', requiredRoles: 'admin' },
    { option: 'listAsset', icon: 'list', route: 'assets-list', requiredRoles: 'member,admin' },
  ]
}
