import { Component, OnInit } from '@angular/core';
import { HEROES } from 'src/app/data/mock-heroes';
import { Hero } from 'src/app/models/Hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  // defining a property to expose the HEROES array for binding
  heroes: Hero[] = HEROES;

  selectedHero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

}
