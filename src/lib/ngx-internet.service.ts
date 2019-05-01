import { Injectable } from '@angular/core';
import { fromEvent, Observable, OperatorFunction } from 'rxjs';
import { startWith, map, merge } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InternetConnectivity {

  private offlineEvent: Observable<Event> = fromEvent(window, 'offline');

  isOnline: Observable<boolean> = fromEvent(window, 'online')
                              .pipe(
                                merge(this.offlineEvent),
                                map((d: Event) => {
                                  if(d.type == "online"){
                                    return true
                                  }
                                  return false;
                                }),
                                startWith(window.navigator.onLine)
                                )


  constructor() {
  }


}
