import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule} from "./app.routes";
import { PoTemplatesModule } from "@po-ui/ng-templates";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PoModule } from "@po-ui/ng-components";
import { APP_BASE_HREF } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { Cuf0069Component } from "./monitores/cuf0069/cuf0069.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
      AppComponent, 
      HomeComponent,
      DashboardComponent,
      Cuf0069Component
    ],
    imports: [
      PoModule,
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      PoTemplatesModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot([]),
      BrowserAnimationsModule,
    ],
    providers: [{
      provide: APP_BASE_HREF,
      useValue: window.location.pathname,
    },
  
  ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }