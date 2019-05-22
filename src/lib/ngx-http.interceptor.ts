import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { HttpConnectivity } from './ngx-httpconnection.service';

@Injectable({
    providedIn: 'root'
})
export class HttpConnectivityInterceptor implements HttpInterceptor {

    constructor(private httpConnectivity: HttpConnectivity) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        const started = Date.now();
        let ok: string;
        let status: any;
        this.httpConnectivity.updateConnection(true)


        return next.handle(req).pipe(
            tap(
                event => {
                    ok = event instanceof HttpResponse ? 'success' : '';
                    status = (event as HttpResponse<any>).status;
                },
                error => ok = 'failed'
            ),
            finalize(() => {
                const elapsed = Date.now() - started;
                this.httpConnectivity.updateConnection(false);
                this.httpConnectivity.updateSpy({
                    outcome: ok,
                    status,
                    url: req.urlWithParams,
                    time: `${elapsed} ms`
                })
            })
        )
    }



}
