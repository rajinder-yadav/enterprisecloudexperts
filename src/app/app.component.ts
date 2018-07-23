import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GoogleTagManagerService } from './service/google-tag-manager.service';

@Component({
  selector: 'ecx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent {
  constructor(private router: Router, private gtm: GoogleTagManagerService) {

    gtm.init();
    // gtm.event('initialPageLoad');

    // as.init();
    // this.router.events
    //   .filter(current => (current instanceof NavigationEnd))
    //   .subscribe((current: any) => {
    //     as.pageLoad(current.url);
    //     gtag('config', 'UA-113461135-1', { page_path: current.url });
    //   });
  }
}
