import { NgModule } from '@angular/core';
import { HttpConnectivityInterceptor } from './ngx-http.interceptor';
import { HttpConnectivity } from './ngx-httpconnection.service';
import { InternetConnectivity } from './ngx-internet.service';

@NgModule({
  imports: [
  ],
  declarations: [],
  exports: [],
  providers: [
    HttpConnectivityInterceptor,
    HttpConnectivity,
    InternetConnectivity
  ]
})
export class NgxConnectivityModule { }
