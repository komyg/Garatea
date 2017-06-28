import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { ContactComponent } from './contact/contact.component';

import { AboutDataService } from './shared/service/about-data.service';
import { TeamDataService } from './shared/service/team-data.service';
import { ContactService } from './shared/service/contact.service';
import { OfferingsDataService } from './shared/service/offerings-data.service';
import { CarouselItemFilterPipe } from './shared/pipe/carousel-item-filter.pipe';
import { NumberCountPipe } from './shared/pipe/number-count.pipe';
import { ServicesComponent } from './services/services.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AboutComponent,
    TeamComponent,
    ContactComponent,
    CarouselItemFilterPipe,
    NumberCountPipe,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    AboutDataService,
    TeamDataService,
    ContactService,
    OfferingsDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
