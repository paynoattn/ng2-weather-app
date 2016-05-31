/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { routes } from './routes'; 
import { Search } from './search/search.component';
import { Home } from './home/home.component';
import { About } from './about/about.component';
import { Example } from './example/example.component';


@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [ require('./app.scss') ],
  template: require('./app.html'),
  directives: [ Search, Home, About, Example ]
})

export class App {
  public appRoutes: Object = routes;
  public currentRoute: string = this.appRoutes[0].id;
  
  changeRoute(toRoute: string) {
    console.log('changing route to ' + toRoute );
    this.currentRoute = toRoute;
  }
}
