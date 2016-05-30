// App
export * from './app.component';

import { WeatherService } from './globals/weather.service';

// Application wide providers
export const APP_PROVIDERS = [
    WeatherService
];
