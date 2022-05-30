import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor() { }

  // Access for Real-time JSON API for 168 World Currencies
  // Reliable Exchange Rates & Currency
  getCurrencyRate(): Observable<any> {
    return Observable.create( (observer: any) => {
      axios.get('http://apilayer.net/api/live?access_key=668b760de4e02db3dd699eb087ab9463&source=USD'
      ).then((data) => {
        observer.next(data);
      }, (err) => {
         observer.error(err);
      });
    });
  }
  
  // First IP Geolocation API Fast, accurate, reliable
  getUserCountry(): Observable<any> {
    return Observable.create( (observer: any) => {
      axios.get('http://ip-api.com/json'
      ).then((data) => {
        observer.next(data);
      }, (err) => {
         observer.error(err);
      });
    });
  }

  // Second IP Geolocation API Fast, accurate, reliable
  getUserCountry1(): Observable<any> {
    return Observable.create( (observer: any) => {
      axios.get('https://ipapi.co/json'
      ).then((data) => {
        observer.next(data);
      }, (err) => {
         observer.error(err);
      });
    });
  }

  // Third IP Geolocation API Fast, accurate, reliable
  // http://api.ipstack.com/check?access_key=cf438a796e7865f6bebe1d84a0081368
  getUserCountry2(): Observable<any> {
    return Observable.create( (observer: any) => {
      axios.get('https://ipapi.co/json'
      ).then((data) => {
        observer.next(data);
      }, (err) => {
         observer.error(err);
      });
    });
  }
  
}
