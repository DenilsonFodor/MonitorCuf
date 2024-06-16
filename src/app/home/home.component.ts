import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{

  menus: Array<PoMenuItem> = 
  [
    { label: 'DashBoard', 
      link: './dashboard', 
      icon: 'po-icon-chart-columns',
      shortLabel: 'DashBoard'},

    { label: 'Monitores', 
      icon: 'po-icon-device-desktop',
      shortLabel: 'Monitores',
      subItems: [//{label: 'CUF0030', action: this.onCuf0030},
                 //{label: 'CUF0050', action: this.onCuf0050},
                 {label: 'CUF0069', 
                  link: './monitores/cuf0069',
                  icon: 'po-icon-mail'}]}
  ]
  
 
  menuItemSelected: string = ''

  constructor(private router: Router) {}

  ngOnInit(): void {}
    
 
  menuAction(menu: PoMenuItem) {
    this.menuItemSelected = menu.label;
    
  }


}
