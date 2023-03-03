import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CollectionService } from 'src/app/services/collection.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-collect-button',
  templateUrl: './collect-button.component.html',
  styleUrls: ['./collect-button.component.css']
})
export class CollectButtonComponent implements OnInit{

  public loading: boolean = false;
  public isCaught: boolean = false;
  @Input() pokemonName: string = "";

  constructor(
    private userService: UserService,
    private readonly collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    //Inputs are resolved
    this.isCaught = this.userService.inFavourites(this.pokemonName) 
  }

  onCollectClick(): void {
    this.loading = true;
    //Add pokemon to trainer
    this.collectionService.addToCollection(this.pokemonName)
      .subscribe({
        next: (user: User) => {
          this.loading = false;
          this.isCaught = this.userService.inFavourites(this.pokemonName)
        },
        error: (error: HttpErrorResponse) => {
          console.log("Error", error.message);
        }
      })
    
    
  }
}
