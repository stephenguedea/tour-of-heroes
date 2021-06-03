import { Component, OnInit } from '@angular/core';
import { HEROES } from 'src/app/data/mock-heroes';
import { Hero } from 'src/app/models/Hero';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  heroes: Hero[] = [];

  selectedHero?: Hero;

  constructor(private heroService: HeroService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.retrieveData();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
    this.messageService.add(`HerosComponent: Selected hero ID = ${hero.id}`);
  }

  // request to get service method
  retrieveData() {
    this.heroService.getHeroes().subscribe(data => {
      this.heroes = data
    });
  }



}
