import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cuf0069Component } from './cuf0069.component';

const routes: Routes = [
  {path:'', component: Cuf0069Component}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Cuf0069RoutingModule { }
