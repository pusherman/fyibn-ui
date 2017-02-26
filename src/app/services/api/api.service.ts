import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Request,
  RequestMethod,
  RequestOptions,
  Response,
  URLSearchParams,
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { NgRedux } from 'ng2-redux';

import { IAppState } from '../../../store';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import { AuthActions } from '../auth/auth.actions';

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private auth: AuthService,
    private ngRedux: NgRedux<IAppState>,
  ) { }

  get(url: string, search?: URLSearchParams) {
    return this.request(RequestMethod.Get, url, search);
  }

  post(url: string, body: any, search?: URLSearchParams) {
    return this.request(RequestMethod.Post, url, search, body);
  }

  delete(url: string, body: any, search?: URLSearchParams) {
    return this.request(RequestMethod.Delete, url, search, body);
  }

  // put(url: string, options?: RequestOptionsArgs) {
  //   return this.request(RequestMethod.Put, url, options);
  // }

  // patch(url: string, options?: RequestOptionsArgs) {
  //   return this.request(RequestMethod.Patch, url, options);
  // }

  private buildUrl(urn: string) {
    return `${environment.endpoint}/api/${urn}`;
  }

  private getAuthHeaders(): Headers {
    const accessToken = localStorage.getItem('access_token');
    const authHeader = {};

    if (accessToken) {
      authHeader['Authorization'] = `Bearer ${accessToken}`;
    }

    return new Headers(authHeader);
  }

  private request(
    method: RequestMethod,
    urn: string,
    search?: URLSearchParams,
    body?: any,
  ) {
    const url = this.buildUrl(urn);
    const headers = this.getAuthHeaders();
    const request = new Request({ method, url, headers, search, body });

    return this.http.request(request)
      .map((response: Response) => {
        try {
          return response.json();
        } catch (error) {
          return response;
        }
      })
      .catch(error => {
        return error.status === 401 && this.refreshTokenExists() ?
        this.refreshTokenAndRetry(method, urn, search) :
        Observable.throw('Server error');
      });
  }

  private refreshTokenExists() {
    return localStorage.getItem('refresh_token');
  }

  private refreshTokenAndRetry(method, urn, search) {
    return this.auth.refreshAccessToken()
      .flatMap(() => this.request(method, urn, search))
      .catch(error => Observable.throw(AuthActions.REFRESH_TOKEN_FAILED));
  }
}
