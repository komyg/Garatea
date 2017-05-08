import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public isCollapsed = true;
  public navBarOn: boolean;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.navBarOn = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const number = this.document.body.scrollTop;
    if (number > 100) {
      this.navBarOn = true;
    }
    else if (this.navBarOn && number < 10) {
      this.navBarOn = false;
    }
  }

}
