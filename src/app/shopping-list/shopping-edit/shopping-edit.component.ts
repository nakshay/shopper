import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  editSubscription : Subscription;
  editMode = false;
  editedItemIndex: number;
  currentlyEditedItem : Ingredient;

  @ViewChild("f") form : NgForm;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit(): void {
    this.editSubscription = this.shoppingListService.ingredientEditStarted.subscribe(
      (index : number) => {
        this.editedItemIndex = index;
        this.currentlyEditedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
        this.editMode = true;

        this.form.setValue({
          name : this.currentlyEditedItem.name,
          amount : this.currentlyEditedItem.amount
        });

      }
    );
  }

  onAddItem(form : NgForm){
    let formValue = form.value;
    let ingredient = new Ingredient(formValue.name,formValue.amount);
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex,ingredient);
    }else{
      this.shoppingListService.addIngredient(ingredient);
    }

    this.onReset();
  }

  deleteItem(){
    this.shoppingListService.onDelete(this.editedItemIndex);
    this.onReset();
  }

  onReset(){
    this.form.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }

}
