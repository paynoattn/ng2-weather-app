import {
  beforeEachProviders,
  inject,
  injectAsync,
  it
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';

describe('App', () => {
  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    App
  ]);
  it('should have routes', inject([ App ], (app) => {
    expect(app.appRoutes[0].id).toEqual('home');
  }));
  it('should have a default route', inject([ App ], (app) => {
    expect(app.currentRoute).toEqual(app.appRoutes[0].id);
  }));
  it('should change routes', inject([ App ], (app) => {
    const testToRoute: string = 'about';
    app.changeRoute(testToRoute);
    expect(app.currentRoute).toEqual(testToRoute);
  }));

});
