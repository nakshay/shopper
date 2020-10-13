import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  error = null;

  constructor(private authService: AuthService,private router: Router,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }



  onSubmit(form: NgForm) {

    let authObservable: Observable<AuthResponseData>;


    if (form.invalid) {
      return;
    }

    this.spinnerService.show();
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    } else {
      authObservable = this.authService.singUp(email, password)
    }

    authObservable.subscribe(
      (data) => {
        console.log(data);
        this.spinnerService.hide();
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.spinnerService.hide();
      }
    );
    form.reset();
  }
  onHandleError(){
    this.error = null;  
  }

}
