import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { filter } from 'rxjs/operators';

/**
 * Google Tag Manager (GTM) Angular Service.
 * Service should be injected once and run as a global singleton.
 * https://developers.google.com/tag-manager/quickstart
 * https://support.google.com/tagmanager/answer/6103696?hl=en
*/
@Injectable()
export class GoogleTagManagerService {

  constructor(private router: Router) {
    window['dataLayer'] = window['dataLayer'] || [];
  }

  /**
   * Load GTM library and create initial dataLayer, should be called ASAP.
   * Following inti call, you should create a initial page load event.
   * https://developers.google.com/tag-manager/quickstart
  */
  public init(): void {
    this.loadGTM();
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.event('pageLoad');
    });
  }

  /**
   * Create an event object to be passed to GA.
   * @param event     GA event name (required).
   * @param category  Event category name (optional, good to provide).
   * @param action    Event action name (optional, good to provide).
   * @param label     Event action label (optional).
   * @param value     Event value, can be a number or string (optional).
   */
  public event(
    event: string,
    category: string = '',
    action: string = '',
    label: string = '',
    value: number | string = ''
  ): void {
    // https://developers.google.com/tag-manager/devguide
    window['dataLayer'].push({
      'event': event,
      'eventCategory': category,
      'eventAction': action,
      'eventLabel': label,
      'eventValue': value
    });
  }

  /**
   * Load Google Tag Manager.
   */
  private loadGTM() {
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
      const f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l !== 'dataLayer' ? '&l=' + l : '';
      j['async'] = true;
      j['src'] = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-KNX9L34');
  }

}
