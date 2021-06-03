import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HEROES } from '../data/mock-heroes';
import { Hero } from '../models/Hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageSvc: MessageService) { }

  // service method for components for retrieve data
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageSvc.add("HeroService: fetched heroes");
    return heroes;
  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageSvc.add(`Hero Service: fetched hero id = ${id}`);
    return of(hero);
  }
}
