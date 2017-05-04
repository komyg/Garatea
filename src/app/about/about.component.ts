import { Component, OnInit } from '@angular/core';

import { AboutDataService } from '../shared/service/about-data.service';
import { About } from '../shared/model/about.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  private aboutItems: About;

  constructor(private dataService: AboutDataService) { }

  ngOnInit() {
    this.dataService.getAboutData()
      .then((data: About) => {
        this.aboutItems = data;
      });
  }
}
