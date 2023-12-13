import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
// import { HomeComponent } from './app/home/home.component';
// import { OrderComponent } from './app/order/order.component';
// import { OrderConfirmComponent } from './app/order-confirm/order-confirm.component';
import { LoginComponent } from './app/login/login.component';
import { RegisterComponent } from './app/register/register.component';
import { DetailsProductComponent } from './app/details-product/details-product.component';

const bootstrap = () => bootstrapApplication( DetailsProductComponent, config);

export default bootstrap;
