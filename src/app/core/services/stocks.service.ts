import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
import { StocksModel, StockDetail, StockNameSymbol, EarningsList, Earnings } from './stocks.model';
import { Observable, Subject, of } from 'rxjs';
import { DatePipe } from '@angular/common';
//import  'angular-black-scholas';
import _blackScholes from 'black-scholes/black-scholes.js';
import { BlackScholes } from 'black-scholes-js';
import { BlackScholesService } from './blackscholesService';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

declare var BSHolder: any;

@Injectable({ providedIn: 'root' })
export class StocksService {

  private todaysEarnings = 'https://cloud.iexapis.com/stable//stock/market/today-earnings?token=sk_5474d33fd956493094223179a17eab4e';
  private gainersUrl = 'https://cloud.iexapis.com/stable/stock/market/list/gainers?token=sk_5474d33fd956493094223179a17eab4e';  // URL to web api
  private loserssUrl = 'https://cloud.iexapis.com/stable/stock/market/list/losers?token=sk_5474d33fd956493094223179a17eab4e';  // URL to web api
  private stockNewsUrl = 'https://cloud.iexapis.com/stable/stock/';
  private stocksEndPoint = '/batch?types=quote,news,chart&range=3m&last=10';
  private googleEndPoint = 'http://www.google.com/finance/historical?q=';
  public earningDetail = new Subject<Earnings>();
  public stockDetail = new Subject<StocksModel>();
  public gainerOrLosers = new Subject<String>();


  constructor(private http: HttpClient, private blackScholesService: BlackScholesService) { }

  /** GET heroes from the server */
  public getGainers(): Observable<StocksModel[]> {
    return this.http.get<StocksModel[]>(this.gainersUrl)
      .pipe(
        tap(heroes => console.log(`fetched gainers`)),
        catchError(this.handleError('getGainers', []))
      );
  }

  public getLosers(): Observable<StocksModel[]> {
    return this.http.get<StocksModel[]>(this.loserssUrl)
      .pipe(
        tap(heroes => console.log(`fetched losers`)),
        catchError(this.handleError('getLosers', []))
      );
  }

  public getScholasPutCalc(stock: number, strike: number, interest: number, vola: number, term: number) {
    return _blackScholes.blackScholes(stock, strike, term, vola / 100, interest / 100, "put");
  }

  public getScholasCallCalc(stock: number, strike: number, interest: number, vola: number, term: number) {
    console.log(stock + '>>' + strike + ' >>' + term * 12 * 30 + '>>' + vola / 100 + '>>' + interest / 100)

    return _blackScholes.blackScholes(stock, strike, term, vola / 100, interest / 100, "call");
  }


  /** GET News of a perticular Stock from the server */
  public getDetails(symbol: string): Observable<StockDetail> {
    if (symbol == undefined || symbol == '') {
      return null;
    }
    else {
      return this.http.get<StockDetail>(this.stockNewsUrl + symbol + '/' + this.stocksEndPoint + '&token=sk_5474d33fd956493094223179a17eab4e');
    }
    /* .pipe(
       tap( (response: StockDetail) => console.log(`fetched News` + response)),
       catchError(this.handleError('getNews', []))
     );*/
  }

  public getScholas(): Observable<any> {
    const url = 'https://www.erieri.com/BlackScholes/Process?StockPrice=40&OptionPrice=25&Maturity=.08&InterestRate=5&Volatility=50&_=1532790648369';
    return this.http.get<any>(url);
  }


  /** GET News of a perticular Stock from the server */
  public getSymbols(symbol: string): Observable<any> {
    return this.http.get<any>(this.stockNewsUrl + symbol + '/' + this.stocksEndPoint + '&token=sk_5474d33fd956493094223179a17eab4e');
  }

  public getEarnings(): Observable<EarningsList> {
    return this.http.get<EarningsList>(this.todaysEarnings);
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/