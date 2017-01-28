import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private endpoint = `${environment.endpoint}/oauth/token`;
  private httpAuthPass = 'cmVzdC1hcGk6';

  constructor(private http: Http) { }

  login(email: string, password: string): Observable<any> {
    const headers: Headers = this.getTokenHeaders();
    const credentials: string = this.getTokenQueryParams({
      grant_type: 'password',
      client_id: '5',
      client_secret: 'ybsD816Et8XKbAOx4kCEwDt2YdmwwQcvxOI36cCm',
      username: email,
      password,
    });

    return this.http.post(this.endpoint, credentials, { headers })
      .map((res: Response) => {
        const jwt = res.json();
        localStorage.setItem('access_token', jwt.access_token);
        localStorage.setItem('refresh_token', jwt.refresh_token);

        return jwt;
      })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  refreshAccessToken() {
    const headers: Headers = this.getTokenHeaders();
    const refreshToken = localStorage.getItem('refresh_token');

    const refreshBody: string = this.getTokenQueryParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    });

    return this.http.post(this.endpoint, refreshBody, { headers })
      .map((res: Response) => {
        const jwt = res.json();
        console.log('refresh success', jwt);
        localStorage.setItem('access_token', jwt.access_token);
        localStorage.setItem('refresh_token', jwt.refresh_token);
      });
  }

  private getTokenHeaders(): Headers {
    return new Headers({
      'Authorization': `Basic ${this.httpAuthPass}`,
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });
  }

  private getTokenQueryParams(additionalParams: {}): string {
    const queryParams = new URLSearchParams();
    queryParams.append('client_id', 'rest-api');

    Object.keys(additionalParams).forEach(key => {
      queryParams.append(key, additionalParams[key]);
    });

    return queryParams.toString();
  }
}
