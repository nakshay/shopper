import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered? : boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  singUp(email: string, password: string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }).pipe(
        catchError(
          this.handlerError
        )
      );
  }

  login(email:string, password : string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    +environment.firebaseAPIKey,
    { email: email,
      password: password,
      returnSecureToken: true}).pipe(
        catchError(this.handlerError)
      )
  }


  handlerError(errorRes : HttpErrorResponse) {
    let error = "unknown error occuered";
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(error);
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          error = "This email already exist";
          break;
        case 'EMAIL_NOT_FOUND':
          error = "Email was not found";
          break;
        case 'INVALID_PASSWORD':
          error = "Invalid password entered";
          break;
      }
      return throwError(error);
    }
  }

}
