import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpConnectivity {

  private Count = 0;
  private httpRequest: BehaviorSubject<Number> = new BehaviorSubject(0);
  private spyStatus: Subject<any> = new Subject();

  get isConnected$(): Observable<boolean>{
    return this.httpRequest.asObservable().pipe(
      map(d => {
        if(d > 0){
          return true
        } else {
          return false
        }
      })
    )
  }

  get connectionCount$(): Observable<any>{
    return this.httpRequest.asObservable()
  }

  get connectionSpy$(): Observable<any>{
    return this.spyStatus.asObservable();
  }
  
  constructor() {
  }

  updateConnection(up: Boolean){
      if(up){
          this.Count++;
          this.httpRequest.next(this.Count);
      } else {
        this.Count--;
        this.httpRequest.next(this.Count);
      }
  }

  updateSpy(data) {
    this.spyStatus.next(data);
  }


}
