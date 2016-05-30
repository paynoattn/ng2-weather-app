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
import { WeatherService } from './weather.service';
import { Weather } from './weather';
import { DataService } from './data.service';

describe('Services', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => {
    return [
      HTTP_PROVIDERS,
      provide(XHRBackend, {useClass: MockBackend}),
      WeatherService,
      DataService
    ];
  });
  
  it('should update Search term', inject([ WeatherService ], (weather) => {
      let weatherSearchTerm;
      function callback(callbackTerm) {
        weatherSearchTerm = callbackTerm;
      }
      weather.weatherSearch$.subscribe(
            weatherLocation => {
               callback(weatherLocation);
            });
     weather.weatherLocation = 'testing123';
     weather.updateSearchStream();
        
     expect(weatherSearchTerm).toEqual('testing123');
  }));
  
  it('should return a correct url', inject([DataService], (data) => {
    const seattleName = data.serviceUrls.byName('seattle');
    const seattleWithCountry = data.serviceUrls.withCountry('seattle', 'US');
    const seattleZipWithCountry = data.serviceUrls.byZip( 98101, 'US');
    
    expect(seattleName).toEqual(data.apiURL + 'weather?q=seattle' + data.authID + data.units);
    expect(seattleWithCountry).toEqual(data.apiURL + 'weather?q=seattle,US' + data.authID + data.units);
    expect(seattleZipWithCountry).toEqual(data.apiURL + 'weather?zip=98101,US' + data.authID + data.units);
  }));
  
  it('should fail on 404 or other status errors', inject([ DataService, XHRBackend ], (data, mockBackend) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              status: 404
            }
          )));
      });
    
    expect( () => { data.getWeather().subscribe(); } ).toThrow();
  }));
  
  it('service should retrieve data when called', inject([ DataService, XHRBackend ], (data, mockBackend) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockRespond(new Response(
          new ResponseOptions({
              body: {
                main: {
                  temp: 123,
                  temp_max: 130,
                  temp_min: 110
                }
              },
              status: 200
            }
          )));
      });
    
    data.getWeather('seattle').subscribe((weather: Weather) => {
      expect(weather.main.temp).toBe(123);
      expect(weather.main.temp_max).toBe(130);
      expect(weather.main.temp_min).toBe(110);
    });
  }));
});
