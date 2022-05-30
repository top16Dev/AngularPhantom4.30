import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import axios from 'axios';
import getSymbolFromCurrency from 'currency-symbol-map';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import * as cc from 'currency-codes';  
import { DataApiService } from 'src/app/services/data-api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  value = [0, 0, 0];
  // tslint:disable-next-line:variable-name
  minus_disabled = [true, true, true];
  specialOfferProduct = {};
  productType = [];
  productType1 = [];
  slug = 'dronex.pro.novads';
  bestSeller = {};
  expanded = false;
  accessories = [];
  subTotal1 = 0;
  subTotal2 = 0;
  subTotalAccessories = [];
  subTotal = 0;
  Total1 = 0;
  Total2 = 0;
  totalAccessories = [];
  Total = 0;
  saveMoney = 0;
  discount = 0;
  countries = [];
  hasState = false;
  States = [];
  Currencies = [];
  rate = 1;
  currencySymbol = '';
  Q2 = 1;
  cardnumber = '';
  myCountry = '';
  currencyCode = '';

  myControl = new FormControl();
  myControl1 = new FormControl();
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filteredStates: Observable<string[]>;

  constructor( private productData: ProductService, private route: ActivatedRoute, private router: Router, private DataApi: DataApiService) { 
    this.route.pathFromRoot[1].url.subscribe(val => {
      if (val[1].path !== undefined){
        this.slug = val[1].path;
      }
    });
  }

  ngOnInit() {
    
    this.currencySymbol = getSymbolFromCurrency('USD');
    // currency exchange rates

    // http://www.apilayer.net/api/live?access_key=f0e27e6dedb8e0e90bc557e8821ede3f&source=USD

     // Call Reliable Exchange Rates & Currency
     // this.DataApi.getCurrencyRate().subscribe(data => {
    //axios.get('http://apilayer.net/api/live?access_key=668b760de4e02db3dd699eb087ab9463&source=USD'
     // ).then((data) => {
    this.DataApi.getCurrencyRate().subscribe(data => {
        const result = data.data.quotes;
        // tslint:disable-next-line:only-arrow-functions
        this.Currencies = Object.keys(result).map(function(key) {
          return [key, result[key]];
        });
        
        // GET First API 
        this.DataApi.getUserCountry().subscribe(data => {
        //axios.get('http://ip-api.com/json')
          //.then((data) => {
            this.myCountry = data.data.country;
            if (this.myCountry === 'Russia'){
              this.myCountry += 'n Federation (The)';
            }
            let frontEndCurrency;
            this.currencyCode = cc.country(this.myCountry)[0].code;
            frontEndCurrency = 'USD' + this.currencyCode;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.Currencies.length; i++) {
              if (this.Currencies[i][0] === frontEndCurrency) {
                this.rate = this.Currencies[i][1];
                console.log(this.rate + " Call from First API");
                break;
              }
            }
            this.currencySymbol = getSymbolFromCurrency(this.currencyCode);
            console.log(this.currencySymbol + " Call from First API");
          }, (err) => {
            //Call Second API 
            this.DataApi.getUserCountry1().subscribe(data => {
              this.myCountry = data.data.country_name;
            if (this.myCountry === 'Russia'){
              this.myCountry += 'n Federation (The)';
            }
            let frontEndCurrency;
            this.currencyCode = cc.country(this.myCountry)[0].code;
            frontEndCurrency = 'USD' + this.currencyCode;
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.Currencies.length; i++) {
              if (this.Currencies[i][0] === frontEndCurrency) {
                this.rate = this.Currencies[i][1];
                console.log(this.rate + " Call from Second API");
                break;
              }
            }
            this.currencySymbol = getSymbolFromCurrency(this.currencyCode);
            console.log(this.currencySymbol + " Call from Second API");
            }, (err) => {
            // Call third API 
               console.log(err, " Error in part Third");
               throw(err);
           });// End line of Call Second API
          })// End line of Call First API
      }, (err) => {
         throw(err);
      });

    


    this.productData.getSpecialOffer(this.slug).subscribe(test => {
      this.specialOfferProduct = test;
    });
    this.productData.getProduct(this.slug).subscribe(test => {
      this.productType1 = test.typeQuantity;
      this.subTotal1 = this.productType1[0].totalAmount;
      this.Total1 = this.productType1[0].dueAmount;
      this.accessories = test.accessories;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < test.accessories.length; i++) {
        this.subTotalAccessories[i] = this.accessories[i].priceMain;
        this.totalAccessories[i] =  this.accessories[i].priceNew;
        this.subTotal2 += this.subTotalAccessories[i];
        this.Total2 += this.totalAccessories[i];
      }
      this.subTotal = this.subTotal1 + this.subTotal2;
      this.bestSeller = test.typeQuantity[0];
      for (let i = 1; i < test.typeQuantity.length; i++) {
        this.productType.push(test.typeQuantity[i]);
      }
      this.Total = this.Total1 + this.Total2;
      this.saveMoney = this.subTotal - this.Total;
      this.discount = Math.floor (this.saveMoney / this.subTotal * 100);
    });

    //Get Countries from Local Storage
    var array = JSON.parse(localStorage.getItem('countries'));
    // Check variable from local Storage if = null GET from DB and push in local Storage
    if (array == null) {
      this.productData.getCountry().subscribe(test => {
        this.countries = test;
        console.log(this.countries);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < test.length; i++) {
          this.options.push(test[i].name);
        }
        this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      });
    } else if (array != null) {
      this.countries = array;
      for (let i = 0; i < array.length; i++) {
        this.options.push(array[i].name);
      }
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.States.filter(state => state.toLowerCase().includes(filterValue));
  }

  increment(i) {
    this.value[i]++;
    if (this.value[i] > 0) {
      this.minus_disabled[i] = false;
    }
    this.subTotal2 -= this.subTotalAccessories[i];
    this.subTotalAccessories[i] = this.accessories[i].priceMain * this.value[i];
    this.subTotal2 += this.subTotalAccessories[i];
    this.subTotal = this.subTotal1 + this.subTotal2;

    this.Total2 -= this.totalAccessories[i];
    this.totalAccessories[i] = this.accessories[i].priceNew * this.value[i];
    this.Total2 += this.totalAccessories[i];
    this.Total = this.Total1 + this.Total2;
    this.saveMoney = this.subTotal - this.Total;
    this.discount = Math.floor (this.saveMoney / this.subTotal * 100);
  }

  decrement(i) {
    this.value[i]--;
    if (this.value[i] < 1) {
      this.minus_disabled[i] = true;
    }
    this.subTotal2 -= this.subTotalAccessories[i];
    this.subTotalAccessories[i] = this.accessories[i].priceMain * this.value[i];
    this.subTotal2 += this.subTotalAccessories[i];
    this.subTotal = this.subTotal1 + this.subTotal2;

    this.Total2 -= this.totalAccessories[i];
    this.totalAccessories[i] = this.accessories[i].priceNew * this.value[i];
    this.Total2 += this.totalAccessories[i];
    this.Total = this.Total1 + this.Total2;
    this.saveMoney = this.subTotal - this.Total;
    this.discount = Math.floor (this.saveMoney / this.subTotal * 100);
  }

  toggle() {
    if (this.expanded === true) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }
  }

  cal_Total(i) {
    this.subTotal1 = this.productType1[i].totalAmount;
    this.Total1 = this.productType1[i].dueAmount;
    this.subTotal = this.subTotal1 + this.subTotal2;
    this.Total = this.Total1 + this.Total2;
    this.saveMoney = this.subTotal - this.Total;
    this.discount = Math.floor (this.saveMoney / this.subTotal * 100);
  }

  select(option) {
    console.log(this.myCountry);
    let index = 0;
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i] === option) {
        index = i;
        break;
      }
    }
    if (this.countries[index].state.length) {
      this.hasState = true;
      this.States = [];
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.countries[index].state.length; i++) {
        this.States.push(this.countries[index].state[i].name);
      }
    }
    this.filteredStates = this.myControl1.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter1(value))
      );
    
    let frontEndCurrency = this.countries[index].frontEndCurrency;
    frontEndCurrency = 'USD' + frontEndCurrency;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.Currencies.length; i++) {
      if (this.Currencies[i][0] === frontEndCurrency) {
        this.rate = this.Currencies[i][1];
        break;
      }
    }
    this.currencySymbol = getSymbolFromCurrency(this.countries[index].frontEndCurrency);
  }

  changeType() {
    if ((this.cardnumber.length === 4) || (this.cardnumber.length === 9)|| (this.cardnumber.length === 14)) {
      this.cardnumber += ' ';
    }
    if ((this.cardnumber.length === 1) && (this.cardnumber === '4')){
      this.Q2 = 1;
    }
    if (this.cardnumber.length === 2){
      if ((this.cardnumber === '51') || (this.cardnumber === '52')||(this.cardnumber === '53') || (this.cardnumber === '54') ||(this.cardnumber === '55')){
        this.Q2 = 2;
      }
    }
  }
}
