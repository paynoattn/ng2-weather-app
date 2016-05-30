import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable();

export class WeatherService {

  // Observable string sources
  public weatherLocation: string;
  public weatherSearchSource = new Subject<string>();
  public weatherSearchEvent = this.weatherSearchSource.asObservable();

  updateSearchStream() {
    this.weatherSearchSource.next(this.weatherLocation);
  }
}
