import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-collect-button',
  templateUrl: './collect-button.component.html',
  styleUrls: ['./collect-button.component.css']
})
export class CollectButtonComponent implements OnInit{

  @Input() pokemonName: string = "";
  
  constructor() {

  }

  ngOnInit(): void {
    
  }

  onCollectClick(): void {
    //Add pokemon to trainer
    alert("You caught a pokemon " + this.pokemonName)
  }
}
