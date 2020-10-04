import { asNativeElements, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild("nameRef") nameRef : ElementRef;
  @ViewChild("amountRef") amountRef : ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(){
    let name = this.nameRef.nativeElement.value;
    let amount = this.amountRef.nativeElement.value;
    let ingredient = new Ingredient(name,amount);
    this.ingredientAdded.emit(ingredient);
  }

}
