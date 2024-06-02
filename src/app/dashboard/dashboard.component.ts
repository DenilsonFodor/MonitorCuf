import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


readonly AcaoDash: Array<PoPageAction> = [
  {label: 'Atualiza'} 
];

public readonly breadcrumb: PoBreadcrumb = {
  items: [{ label: 'Home', link: '/' }, { label: 'Dashboard' }]
};

ngOnInit(): void {
  throw new Error('Metodo não implementado.');
}

}