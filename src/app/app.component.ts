import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { Router, NavigationEnd } from "@angular/router";
declare let ga: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public constructor(private titleService: Title, public router: Router ) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
  
   public setTitle( newTitle: string) {
     this.titleService.setTitle( newTitle );
   }
}
