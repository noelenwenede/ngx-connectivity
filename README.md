# ngx-connectivity
ngx-connectivity is an Angular 6+ service that helps monitor the **internet 
connectivity** status of any device running your angular app.


[demo](https://stackblitz.com/edit/ngx-connectivity)

### Usage

###### Using inside a component
```
// app.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InternetConnectivity } from 'ngx-connectivity'
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  internet_status: Boolean;

  constructor(public internetConnectivity: InternetConnectivity) {
  }

  ngOnInit() {
    this.subscription = this.internetConnectivity.isOnline.subscribe(
      d => {
        console.log(d);
        this.internet_status = d;
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
</div>
```


