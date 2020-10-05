import {Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingService : ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form : NgForm){
    let formValue = form.value;
    let ingredient = new Ingredient(formValue.name,formValue.amount);
    this.shoppingService.addIngredient(ingredient);
  }

}
