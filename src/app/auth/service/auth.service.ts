import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError,tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../user.model';

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

  user = new BehaviorSubject<User>(null);

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
        ),
        tap(
          (resData =>{
            const expiresIn = new Date(new Date().getTime() + Number(resData.expiresIn)*1000);
            this.handleAuthetication(resData.email,resData.localId,resData.idToken,expiresIn);
          })
        )
      );
  }

  login(email:string, password : string) {
    return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='
    +environment.firebaseAPIKey,
    { email: email,
      password: password,
      returnSecureToken: true}).pipe(
        catchError(this.handlerError), 
        tap(
          (resData =>{
            const expiresIn = new Date(new Date().getTime() + Number(resData.expiresIn)*1000);
            this.handleAuthetication(resData.email,resData.localId,resData.idToken,expiresIn);
          })
        )
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

  handleAuthetication(email: string, localId: string,idToken: string, expiresIn: Date ) {
    const user = new User(email,localId, idToken,expiresIn);
    this.user.next(user);
  }

}
