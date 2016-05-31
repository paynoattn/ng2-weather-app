import { Component, Output, EventEmitter } from '@angular/core';

import { WeatherService } from '../globals/weather.service';

@Component({
    selector: 'search-form',
    template: require('./search.html')
})

export class Search {

    @Output() searchSubmit = new EventEmitter();

    constructor( public weatherSvc: WeatherService ) { }
    
    handleSubmit() {
        console.log('searching weather for', this.weatherSvc.weatherLocation);
        this.weatherSvc.updateSearchStream();
        this.searchSubmit.emit({
            value: this.weatherSvc.weatherLocation
        });
    }
}
