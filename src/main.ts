import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/home/home.component';
import { OrderComponent } from './app/order/order.component';
// import { AppComponent } from './app/app.component';

bootstrapApplication( OrderComponent, appConfig)
  .catch((err) => console.error(err));
