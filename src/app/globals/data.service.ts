import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Weather } from './weather';

@Injectable()

export class DataService {

  private apiURL: string = 'http://api.openweathermap.org/data/2.5/';
  private authID: string = '&APPID=6d50b1ef93f03623771e062874a665c3';
  private units: string = '&units=imperial'

  private serviceUrls = {
    byName: (name) => this.apiURL + 'weather?q=' + name + this.authID + this.units,
    withCountry: (name, country) => this.apiURL + 'weather?q=' + name + ',' + country + this.authID + this.units,
    byZip: (zip, country) => this.apiURL + 'weather?zip=' + zip + ',' + country + this.authID + this.units
  };

  constructor (private http: Http) {}

  getWeather(location): Observable<Weather[]> {
    return this.http.get(this.serviceUrls.byName(location))
                    .map(this.transformData)
                    .catch(this.handleError);
  }

  private transformData = (response: any) => {
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Response status: ' + response.status);
      }
      let body = response.json();
      return body || { };
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errorMessage = error.message || 'Server error';
    console.error(errorMessage); // log to console instead
    return Observable.throw(errorMessage);
  }
}
