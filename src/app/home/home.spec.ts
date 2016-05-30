import {
  describe,
  expect,
  beforeEach,
  it,
  inject,
  injectAsync,
  beforeEachProviders
} from '@angular/core/testing';

import { provide } from '@angular/core';

import { HTTP_PROVIDERS, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

// Load the implementations that should be tested
import { WeatherService } from '../globals/weather.service';
import { Weather } from '../globals/weather';
import { DataService } from '../globals/data.service';

import { Home } from './home.component';

describe('Home', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      WeatherService,
      DataService,
      Home
    ]);

  it('should have a default state', inject([ Home ], (home) => {
    expect(home.busy).toEqual(false);
    expect(home.weather).toBeUndefined;
    expect(home.errorMessage).toBeUndefined;
    expect(home.subscription).toBeUndefined;
  }));
  
  it('should log ngOnInit', inject([ Home ], (home) => {
    spyOn(console, 'log');
    expect(console.log).not.toHaveBeenCalled();

    home.ngOnInit();
    expect(console.log).toHaveBeenCalled();
  }));
  
  it('should get data from service', inject([ Home, DataService ], (home, data) => {
    let weather = home.getWeather();
    expect(home.busy).toEqual(true);
    expect(weather.isUnsubscribed).toEqual(false);
  }));
  
  it('should teardown', inject([ Home ], (home) => {
    home.ngOnDestroy();
    expect(home.subscription).toBeUndefined;
  }));
});
