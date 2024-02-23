import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showHead = true;
  showNav = true;
  isLoading = false;
  mainContentGray = false
  router: Router

  constructor(router: Router) {
    // on route change to '/login', set the variable showHead to false
    this.router = router
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        if (['/login', '/create-account'].includes(event['url'])) {
          this.showHead = false;
          this.showNav = false;
        } else {
          // console.log("NU")
          this.showHead = true;
          this.showNav = true;
        }

        if (event['url'] === '/home')
          this.mainContentGray = true
        else
          this.mainContentGray = false
      }
    });
  }

  title = 'client';
}
