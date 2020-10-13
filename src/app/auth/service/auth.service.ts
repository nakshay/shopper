import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  private tokenExpirationTimer : any;

  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) { }

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
            this.handleAuthetication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
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
            this.handleAuthetication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
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

  handleAuthetication(email: string, localId: string,idToken: string, expirationDuration: number ) {
    const expiresIn = new Date(new Date().getTime() + Number(expirationDuration)*1000);
    const user = new User(email,localId, idToken,expiresIn);
    this.autoLogout(expirationDuration*1000);
    this.user.next(user);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if(this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin(){
    const userData: {
      email : string,
      id : string,
      _token : string,
      _tokenExpirationDate : string
    } =  JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, 
      userData._token, new Date(userData._tokenExpirationDate));

      if(loadedUser.token) {
        const expireationDuration= new Date(userData._tokenExpirationDate).getTime() - 
        new Date().getTime();
        this.autoLogout(expireationDuration);
        this.user.next(loadedUser);
      }
  }

  autoLogout(expirationDuration: number){
    this.tokenExpirationTimer=  setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

}
