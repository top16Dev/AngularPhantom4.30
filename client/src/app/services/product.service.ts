import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  domain = 'http://localhost:5000/api/product/'; // Development Domain - Not Needed in Production
  // tslint:disable-next-line:variable-name
  country_domain = 'http://localhost:5000/api/country/';
  constructor() {  }

    // Function to get all products from the database
  getAllProducts() {
    // return this.http.get(this.domain + 'api/product/all').map(res => res.json());
  }

  // Function to get the product using the slug
  getSingleProduct(slug) {
    // return this.http.get(this.domain + 'api/product/' + slug).map(res => res.json());
  }

  getSpecialOffer(slug): Observable<any> {
    console.log(slug);
    return Observable.create( (observer: any) => {
      axios.get(`${this.domain}specialOffer/${slug}`
      ).then((data) => {
        observer.next(data.data);
      }, (err) => {
         observer.error(err);
      });
    });
  }

  getProduct(slug): Observable<any> {
    console.log(slug);
    return Observable.create( (observer: any) => {
      axios.get(`${this.domain}${slug}`
      ).then((data) => {
        observer.next(data.data);
      }, (err) => {
         observer.error(err);
      });
    });
  }

  getCountry(): Observable<any> {
    return Observable.create( (observer: any) => {
      axios.get(`${this.country_domain}all`
      ).then((data) => {
        observer.next(data.data);
      }, (err) => {
         observer.error(err);
      });
    });
  }
}
