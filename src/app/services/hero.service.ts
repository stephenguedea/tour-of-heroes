import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, pipe } from 'rxjs';
import { HEROES } from '../data/mock-heroes';
import { Hero } from '../models/Hero';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  // defining the heroesUrl of the form ':base/:collectionName' with the address of the heroes
  // resource on the server. Here 'base' is the resource to which requests are made, and 
  // 'collectionName' is the heroes data object in the 'in-memory-data-service.ts'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private messageSvc: MessageService,
              private http: HttpClient) { }


  // new service method
  // GET heroes from the server
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      catchError(this.handleError<Hero[]>('getHeroes', []))
      // the catchError() operator intercepts an Observable that failed.
      // The operator then passes the error to the error handling function
    );
  }

  // updated getHero() method
  // GET hero by id. Will 404 if id not found
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id = ${id}`)),
      catchError(this.handleError<Hero>(`getHero id =${id}`))
    );
  }

  // new getHero() method:
  /*
  - getHero() constructs a request URL with the desired hero's id
  - the server should respond with a single hero rather than an array of heroes
  - getHero() returns an Observable<Hero> ("an observable of Hero objects") rather 
  than an observable of hero arrays.
  */

  // Log a HeroService message with the MessageService
  private log(message: string) {
    this.messageSvc.add(`HeroService: ${ message }`);
  }


  // handleError() method reports the error and then returns as innocuous result so that
  // the application keeps working
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning any empty result
      return of(result as T);

    };
  }

  // the handleError() will be shared by many 'HeroService' methods so it's generalized to meet
  // their different needs.

  /*
  Instead of handling the error directly, it returns an error handler function to 'catchError'
  that it has configured with both the name of the operation that failed and a safe return value
  */

  // UPDATE HEROES
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions)
    .pipe(tap( _ => this.log( `update hero id = ${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
    );
  }

  // add hero
  // POST: add a new hero to the server
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  /* addHero() differs from updateHero():
  - it calls HttpClient.post() instead of put()
  - it expects the server to generate an id for the new hero, 
    which it returns in the Observable<Hero> to the caller.
  */


  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(tap(_ => this.log(`Deleted hero id=${id}`)),
    catchError(this.handleError<Hero>('deleteHero'))
    );
  }
  
}

/*
After reporting the error to the console, the handler constructs a user friendly 
message and returns a safe value to the application so the application can keep working.

Because each service method returns a different kind of Observable result, 
'handleError()' takes a type parameter so it can return the safe value as the type
that the application expects.
*/
