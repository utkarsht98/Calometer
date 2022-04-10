import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {environment as env} from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  headers: HttpHeaders;
  
  constructor(private client: HttpClient) { 
    this.headers = new HttpHeaders({'content-type':'application/json'});
  }

  getMeals(username:string): Observable<any> {
    return this.client.get<any>(env.apiAddress + '/getMeals/'+username).pipe(
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
