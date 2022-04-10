import { Injectable } from '@angular/core';
import {environment as env} from '../../environments/environment'
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse} from "@angular/common/http";
import { LoginRequest } from '../models/loginRequest';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  headers: HttpHeaders;

  constructor(private client: HttpClient) {
    this.headers = new HttpHeaders({'content-type':'application/json'});
  }

  validateCredentials(userLogin: LoginRequest): Observable<any> {
    return this.client.post<any>(env.apiAddress + '/getUser', 
           JSON.stringify(userLogin), {headers: this.headers, observe: 'response'}).pipe(
             catchError((error: HttpErrorResponse) => this.handleError(error))
             );
  }

  private handleError(err: HttpErrorResponse){
    if (err.status === 404) {
      return throwError(() => new Error(err.error));
    }
    return throwError(() => new Error('Something went wrong. Please try again!!'))
  }
}
