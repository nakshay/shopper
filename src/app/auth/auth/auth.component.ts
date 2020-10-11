import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;

  constructor(private authService : AuthService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form : NgForm){

    if(form.invalid) {
      return;
    }

    this.spinnerService.show();
    const email = form.value.email;
    const password = form.value.password;

    if(this.isLoginMode) {

    } else{
      this.authService.singUp(email,password).subscribe(
        (data) =>{
          console.log(data);
          this.spinnerService.hide();
        },
        (err) =>{
          console.log(err);
          this.spinnerService.hide();
        }
      );
    }
    form.reset();
  }

}
