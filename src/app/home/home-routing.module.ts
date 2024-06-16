import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { DashboardModule } from '../dashboard/dashboard.module';
import { Cuf0069Module } from '../monitores/cuf0069/cuf0069.module';

const routes: Routes = [
  { path: '' , pathMatch: 'full' , redirectTo:'home'},

  {   
    path: '', component: HomeComponent, children: [
      { path: 'dashboard', loadChildren: () => { return DashboardModule} } ,
      { path: 'monitores/cuf0069', loadChildren: () => { return Cuf0069Module} } ,
      // o path tem que ser exatamente igual link: do home-component
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
