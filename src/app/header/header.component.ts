import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  authSub = new Subscription();
  isAuthenticated = false;

  constructor(private dataStorageService : DataStorageService,
    private authService : AuthService) { }

  ngOnInit(): void {
   this.authSub =  this.authService.user.subscribe(
      (user: User) => {
        console.log('loged in ',user);
        this.isAuthenticated = !!user;
      }
    );
  }  

  onSaveData(){
    this.dataStorageService.storeRecipe();
  }

  onFetchRecipes(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
