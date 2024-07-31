import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Cuf0069RoutingModule } from './cuf0069-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Cuf0069RoutingModule,
    SharedModule,
    MatDatepickerModule,
    MatFormFieldModule,
  
    
  ]
})
export class Cuf0069Module { }
