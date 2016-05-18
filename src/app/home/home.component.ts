import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../../globals/weather.service';
import { Weather } from '../../globals/weather'

import { Search } from '../search/search.component';

let homeTemplate = require('./home.html');

@Component({
    selector: 'home',
    template: homeTemplate,
    directives: [Search],
    styles: [ require('./home.scss') ]
})

export class Home implements OnInit { 
    
    public weatherSvc: any;
    public busy: boolean = false;
    public weather: Weather;
    public errorMessage: Object;
    
    constructor( weatherSvc: WeatherService) {
        this.weatherSvc = weatherSvc;
    }
    
    ngOnInit() {
        console.log('home');
        this.getWeather();
    }
    
    getWeather() {
        if (this.weatherSvc.weatherLocation) {
            this.busy = true;
            console.log('searching weather for ', this.weatherSvc.weatherLocation);
            this.weatherSvc.getWeather()
                .subscribe(
                    weather => {
                        console.log(weather)
                        this.busy = false;
                        this.weather = weather;
                    },
                    error => {
                        this.busy = false;
                        this.errorMessage = error.message;
                     })
        }
    }
}
