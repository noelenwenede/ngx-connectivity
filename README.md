# ngx-connectivity
ngx-connectivity is an Angular 6+ service that helps monitor the **internet 
connectivity** status of any device running your angular app.

```
    npm i ngx-connectivity --save
```


[demo](https://stackblitz.com/edit/ngx-connectivity)

### Usage
To use HttpConnectivity add the HttpConnectivityInterceptor to your AppModule
```
// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpConnectivityInterceptor, InternetConnectivity, HttpConnectivity } from 'ngx-connectivity';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
    SharedModule,
    HttpClientModule, // <---
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConnectivityInterceptor, // <--- Important to use **InternetConnectivity**
      multi: true
    },
    InternetConnectivity, <---
    HttpConnectivity <---
  ]
})
export class AppModule { }

```


###### Using inside a component
```
// app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InternetConnectivity, HttpConnectivity } from 'ngx-connectivity'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  internetSubscription: Subscription;
  internet_status: Boolean;

// public declaration for direct use in component template
  constructor(public internetConnectivity: InternetConnectivity,
              public httpConnectivity: HttpConnectivity) {
  }

  ngOnInit() {
    this.internetSubscription = this.internetConnectivity.isOnline$.subscribe(
      d => {
        console.log(d);
        this.internet_status = d;
      }
    )

    // statistics of every http connection
    this.httpConnectivity.connectionSpy$.subscribe(
      d => {
        console.log(d);
      }
    )

    // true is any http connection is open else false
    this.httpConnectivity.isConnected$.subscribe(
      d => {
        console.log(d);
      }
    )

    // count of open http connection
    this.httpConnectivity.connectionCount$.subscribe(
      d => {
        console.log(d);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

// app.component.html
 <div>
        <h1>Internet connectivity status: {{(internetConnectivity.isOnline | async)? 'Connected': 'Not connected'}}</h1>

        <h1>Http connectivity status: {{(httpConnectivity.isConnected$ | async)? 'Connected': 'Not connected'}}</h1>
  </div>
```


