import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { WeatherService } from '../../globals/weather.service';

let searchTemplate = require('./search.html');

@Component({
    selector: 'search-form',
    template: searchTemplate
})

export class Search {
    
    @Output() searchSubmit = new EventEmitter();

    public weatherSvc;
    private router;
   
    constructor( router: Router, weatherSvc : WeatherService ){
        this.weatherSvc = weatherSvc;
        this.router = router;
    }
    
    handleSubmit(){
        this.router.navigate(['Get Weather']);
        this.searchSubmit.emit({
            value: this.weatherSvc.weatherLocation
        })
    }
}
