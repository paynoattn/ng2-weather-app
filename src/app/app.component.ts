/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import { routes } from './routes'; 

import { Search } from './search/search.component';

/*
 * App Component
 * Top Level Component
 */

const appTemplate = require('./app.html');

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('./app.scss')
  ],
  template: appTemplate,
  directives: [ ROUTER_DIRECTIVES, Search ]
})

@RouteConfig(routes)

export class App implements OnInit {
  
  public appRoutes: Object = routes;
  public loading: boolean = false;

  constructor() {

  }

  ngOnInit() {
    console.log('Hello from App');
  }

}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
