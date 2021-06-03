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
}
