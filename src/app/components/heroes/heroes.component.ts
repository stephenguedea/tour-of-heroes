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


  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.retrieveData();
  }


  // request to get service method
  retrieveData() {
    this.heroService.getHeroes().subscribe(data => {
      this.heroes = data
    });
  }



}
