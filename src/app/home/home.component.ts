import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }   from 'rxjs/Subscription';

import { WeatherService } from '../globals/weather.service';
import { Weather } from '../globals/weather';
import { DataService } from '../globals/data.service';

import { Search } from '../search/search.component';

let homeTemplate = require('./home.html');

@Component({
    selector: 'home',
    template: homeTemplate,
    directives: [Search],
    styles: [ require('./home.scss') ],
    providers: [ DataService ]
})

export class Home implements OnInit { 
    
    public busy: boolean = false;
    public weather: Weather;
    public errorMessage: Object;
    private subscription: Subscription;
    
    constructor( public weatherSvc: WeatherService, private dataSvc: DataService) {
        this.subscription = weatherSvc.weatherSearch$.subscribe(
            weatherLocation => {
                this.getWeather();
            });
    }
    
    ngOnInit() {
        console.log('home');
    }
    
    getWeather() {
        this.busy = true;
        return this.dataSvc.getWeather(this.weatherSvc.weatherLocation)
            .subscribe(
                weather => {
                    this.busy = false;
                    this.weather = weather;
                    console.log('succesfully retrieved weather for', this.weather);
                },
                error => {
                    this.busy = false;
                    this.errorMessage = error.message;
                    });
    }
    
    ngOnDestroy() {
        // prevent memory leak when component destroyed
        this.subscription.unsubscribe();
    }
}
