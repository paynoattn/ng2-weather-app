import {
  beforeEachProviders,
  inject,
  injectAsync,
  it
} from '@angular/core/testing';


// Load the implementations that should be tested
import { WeatherService } from '../globals/weather.service';
import { Search } from './search.component';

describe('Search', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    Search,
    WeatherService
  ]);
  
  it('should handleSubmit', inject([ Search ], (search) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();
    search.weatherSvc.weatherLocation = 'boston';
    search.handleSubmit();
    expect(console.log).toHaveBeenCalled();
  }));
});
