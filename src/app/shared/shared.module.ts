import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoDynamicModule, PoMenuModule, PoModalModule, PoModule, PoPageModule } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';


@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    PoModule, 
    PoMenuModule, 
    PoPageModule, 
    HttpClientModule, 
    PoDynamicModule, 
    PoModalModule,
    RouterModule
  ],
  exports: [
    PoModule, 
    PoMenuModule, 
    PoPageModule, 
    PoModalModule, 
    HttpClientModule,
    MatDatepickerModule,
  ]
})
export class SharedModule {} 
