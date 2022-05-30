import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import axios from 'axios';
import getSymbolFromCurrency from 'currency-symbol-map';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import * as cc from 'currency-codes';  
import * as cl from 'country-language';
import { DataApiService } from 'src/app/services/data-api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  value = [0, 0, 0];
  test = 1;
  
  // tslint:disable-next-line:variable-name
  minus_disabled = [true, true, true];
  cart_disable = [true, true, true, true];
  optionslanguage: string[] = ['English(EN)', 'Español(ES)', 'Deutsch(DE)', 'Russian(RU)','Estonia(ET)', 'French(FR)' , 'Japanese(JP)', 'Singapore(SG)', 'Netherlands(NL)', 'Thai(TH)', 'Portuguese(PT)', 'Danish(DK)','Finnish(FI)', 'Turkish(TR)', 'Polish(PL)'];
  optionscurrencies: string[] = ['EUR','USD','GBP','AED', 'AFN', 'ALL', 'AMD', 'ANG' , 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM','BBD', 'BDT'
      , 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BRL' , 'BSD', 'BTC', 'BTN', 'BWP', 'BYN', 'BAM','BZD', 'CAD'
      , 'CDF', 'CHF','CLF','CLP','CNH','CNY','COP','CRC','CUC','CUP','CVE','CZK','DJF','DKK','DOP','DZD','EGP','ERN','ETB','FJD','FKP','GEL','GGP','GHS','GIP','GMD','GNF','GTQ','GYD'
      , 'HKD','HNL','HRK','HTG','HUF','IDR','ILS','IMP','INR','IQD','IRR','ISK','JEP','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LYD'
      , 'MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRO','MRU','MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR'
      , 'RON','RSD','RUB','RWF','SAR','SBD','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','SSP','STD','STN','SVC','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH'
      , 'UGX','UYU','UYU','UZS','VEF','VES','VND','VUV','WST','XAF','XAG','XAU','XCD','XDR','XOF','XPD','XPF','XPT','YER','ZAR','ZMW','ZWL'];
  removeItem = [false, false, false, false];
  specialOfferProduct = {};
  mostPopular = {};
  cartProducts = [];
  productType = [];
  productType1 = [];
  slug = 'smartcup.novads';
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
  total = 0;
  currencySymbol = '';
  Q2 = 1;
  cardnumber = '';
  myCountry = '';
  myCountry1 = '';
  popular_disable = true;
  myCurrency = '';
  myLanguage = '';
  showConfirm = true;
  currencyCode = '';
  productIndex = 0;
  temp = '';
  cartValue = [0, 0, 0, 0];
  flagImageInit = '../assets/images/country/';
  flagImage = '';
  CountryLanguage;
  showCheckout = false;
  mainAccessories = [];
  slideConfig = {"slidesToShow": 3, "slidesToScroll": 1};
  myControlcountry = new FormControl();
  myControlcountry1 = new FormControl();
  myControlState = new FormControl();
  myControlLanguage = new FormControl();
  myControlcurrency = new FormControl();
  options: string[] = [];
  filteredLanguage: Observable<string[]>;
  filteredStates: Observable<string[]>;
  filteredCountry: Observable<string[]>;
  filteredCountry1: Observable<string[]>;
  filteredcurrencies: Observable<string[]>;
  email = new FormControl('', [Validators.required, Validators.email]);

  clickCups = [false, false, true];

  constructor( private productData: ProductService, private route: ActivatedRoute, private router: Router, private DataApi: DataApiService) { 
    // this.route.pathFromRoot[1].url.subscribe(val => {
    //   if (val[1].path !== undefined){
    //     this.slug = val[1].path;
    //   }
    // });
  }

  ngOnInit() {
    var array = JSON.parse(localStorage.getItem('cartProducts'));
    if (array != null) {
      this.cartProducts = array;
      this.cartValue = JSON.parse(localStorage.getItem('cartValue'));
      this.total = parseInt(localStorage.getItem('total'));
      console.log(this.total);
      this.showCheckout = true;
    }
    this.filteredLanguage = this.myControlLanguage.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterLanguage(value))
      );
    this.filteredcurrencies = this.myControlcurrency.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterCurrencies(value))
      );
    var countryArray = JSON.parse(localStorage.getItem('countries'));
    // Get Countries from MongoDB
    if (countryArray == null) {
      //Get Country
      this.productData.getCountry().subscribe(test => {
        this.countries = test;
        localStorage.setItem('countries', JSON.stringify(this.countries));
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < test.length; i++) {
          this.options.push(test[i].name);
        }

        this.filteredCountry = this.myControlcountry.valueChanges
          .pipe(
            startWith(' '),
            map(value => this._filterCountry(value))
          );
          console.log(this.options);
        this.filteredCountry1 = this.myControlcountry1.valueChanges
        .pipe(
          startWith(' '),
          map(value => this._filterCountry(value))
        );
        // Call Reliable Exchange Rates & Currency
        this.DataApi.getCurrencyRate().subscribe(data => {
          const result = data.data.quotes;
            // tslint:disable-next-line:only-arrow-functions
            this.Currencies = Object.keys(result).map(function(key) {
              return [key, result[key]];
            });
            // detect user's country from Local Storage
            if (localStorage.getItem('Country')!=undefined){
              this.myCountry = localStorage.getItem('Country');
              this.myCountry1 = this.myCountry;
              console.log(this.myCountry1);
              console.log(this.myCountry);
              this.myCurrency = localStorage.getItem('Currency');
              this.myLanguage = localStorage.getItem('Language');
              var temp2 = 'USD' + this.myCurrency;
              for (let i = 0; i < this.Currencies.length; i++) {
                if (this.Currencies[i][0] === temp2) {
                  this.rate = this.Currencies[i][1];
                  break;
                }
              }
              this.currencySymbol = getSymbolFromCurrency(this.myCurrency);
              this.flagImage = this.flagImageInit + this.myCountry + '.png';
              this.showConfirm = false;
            } 
            else {
              // Process for first visit in web site
              this.showConfirm = true;
              this.DataApi.getUserCountry().subscribe(data => {
                    if (data.data.country === 'Russia') {
                      
                      this.temp = data.data.country + 'n Federation (The)';
                      data.data.country = 'Russian';
                    } else if (data.data.country == 'United Kingdom')
                    {
                      this.temp = 'United Kingdom Of Great Britain And Northern Ireland (The)';
                    } else {
                      this.temp = data.data.country;
                    }
                    this.myCountry = data.data.country;
                    this.myCountry1 = this.myCountry;
                    this.flagImage = this.flagImageInit + this.myCountry + '.png';
                    this.myCurrency = cc.country(this.temp)[0].code;
                    var temp2 = 'USD' + this.myCurrency;
                    for (let i = 0; i < this.Currencies.length; i++) {
                      if (this.Currencies[i][0] === temp2) {
                        this.rate = this.Currencies[i][1];
                        break;
                      }
                    }
                    
                    this.currencySymbol = getSymbolFromCurrency(this.myCurrency);
                    for (let i = 0; i< this.options.length; i++) {
                      if (this.options[i] == this.myCountry){
                        const parent = this;
                        cl.getCountryLanguages(this.countries[i].IOS, function (err, languages){
                          if (err) {
                            throw(err)
                          } else {
                            const lanCode = languages[0].iso639_1.toUpperCase();
                            
                            for (let k = 0; k< parent.optionslanguage.length; k++){
                              if (parent.optionslanguage[k].includes(lanCode)) {
                                parent.myLanguage = parent.optionslanguage[k];
                              }
                            }
                            if (parent.myLanguage == ''){
                              parent.myLanguage = parent.optionslanguage[0];
                            }
                          }
                        })
                      }
                    }
                  }, (err) => {
                    // Call second API 
                    this.DataApi.getUserCountry1().subscribe(data => {
                      console.log("Call Second API for Fast, accurate, reliable");
                        if (data.data.country_name === 'Russia') {
                          
                          this.temp = data.data.country_name + 'n Federation (The)';
                          data.data.country_name = 'Russian';
                        } else if (data.data.country_name == 'United Kingdom')
                        {
                          this.temp = 'United Kingdom Of Great Britain And Northern Ireland (The)';
                        } else {
                          this.temp = data.data.country_name;
                        }
                        this.myCountry = data.data.country_name;
                        this.flagImage = this.flagImageInit + this.myCountry + '.png';
                        this.myCurrency = cc.country(this.temp)[0].code;
                        var temp2 = 'USD' + this.myCurrency;
                        for (let i = 0; i < this.Currencies.length; i++) {
                          if (this.Currencies[i][0] === temp2) {
                            this.rate = this.Currencies[i][1];
                            break;
                          }
                        }
                        this.currencySymbol = getSymbolFromCurrency(this.myCurrency);
                        for (let i = 0; i< this.options.length; i++) {
                          if (this.options[i] == this.myCountry){
                            const parent = this;
                            cl.getCountryLanguages(this.countries[i].IOS, function (err, languages){
                              if (err) {
                                throw(err)
                              } else {
                                const lanCode = languages[0].iso639_1.toUpperCase();
                                for (let k = 0; k< parent.optionslanguage.length; k++){
                                  if (parent.optionslanguage[k].includes(lanCode)) {
                                    parent.myLanguage = parent.optionslanguage[k];
                                  }
                                }
                                if (parent.myLanguage == ''){
                                  parent.myLanguage = parent.optionslanguage[0];
                                }
                              }
                            })
                          }
                        }
                      });
                  });
              
            }
        });
      });
      // Get Countries from Local Storage
    } else if (countryArray != null){
      this.countries = countryArray;
      for (let i = 0; i < countryArray.length; i++) {
        this.options.push(countryArray[i].name);
      }

      this.filteredCountry = this.myControlcountry.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filterCountry(value))
          );
          console.log(this.filteredCountry);
      this.filteredCountry1 = this.myControlcountry1.valueChanges
      .pipe(
        startWith(' '),
        map(value => this._filterCountry1(value))
      );
      console.log(this.filteredCountry1);

      // Call Reliable Exchange Rates & Currency
      this.DataApi.getCurrencyRate().subscribe(data => {
        const result = data.data.quotes;
        // tslint:disable-next-line:only-arrow-functions
        this.Currencies = Object.keys(result).map(function(key) {
          return [key, result[key]];
        });
        // detect user's country from Local Stroage
        if (localStorage.getItem('Country')!=undefined){
          this.myCountry = localStorage.getItem('Country');
          this.myCountry1 = this.myCountry;
          this.myCurrency = localStorage.getItem('Currency');
          this.myLanguage = localStorage.getItem('Language');
          var temp2 = 'USD' + this.myCurrency;
          for (let i = 0; i < this.Currencies.length; i++) {
            if (this.Currencies[i][0] === temp2) {
              this.rate = this.Currencies[i][1];
              break;
            }
          }
          this.currencySymbol = getSymbolFromCurrency(this.myCurrency);
          this.flagImage = this.flagImageInit + this.myCountry + '.png';
          this.showConfirm = false;
        } 
        else {
          // Process for first visit in web site
          this.showConfirm = true;
          this.DataApi.getUserCountry().subscribe(data => {
                if (data.data.country === 'Russia') {
                  
                  this.temp = data.data.country + 'n Federation (The)';
                  data.data.country = 'Russian';
                } else if (data.data.country == 'United Kingdom')
                {
                  this.temp = 'United Kingdom Of Great Britain And Northern Ireland (The)';
                } else {
                  this.temp = data.data.country;
                }
                this.myCountry = data.data.country;
                this.myCountry1 = this.myCountry;
                this.flagImage = this.flagImageInit + this.myCountry + '.png';
                this.myCurrency = cc.country(this.temp)[0].code;
                var temp2 = 'USD' + this.myCurrency;
                for (let i = 0; i < this.Currencies.length; i++) {
                  if (this.Currencies[i][0] === temp2) {
                    this.rate = this.Currencies[i][1];
                    break;
                  }
                }
                console.log("Start language");
                this.currencySymbol = getSymbolFromCurrency(this.myCurrency);
                for (let i = 0; i< this.options.length; i++) {
                  if (this.options[i] == this.myCountry){
                    const parent = this;
                   cl.getCountryLanguages(this.countries[i].IOS, function (err, languages){
                      if (err) {
                        throw(err)
                      } else {
                        const lanCode = languages[0].iso639_1.toUpperCase();
                        console.log(lanCode + "code language");
                        for (let k = 0; k< parent.optionslanguage.length; k++){
                          if (parent.optionslanguage[k].includes(lanCode)) {
                            parent.myLanguage = parent.optionslanguage[k];
                            console.log(parent.myLanguage + " language");
                          }
                        }
                        if (parent.myLanguage == ''){
                          parent.myLanguage = parent.optionslanguage[0];
                        }
                      }
                    })
                  }
                }
              }, (err) => {
                // Call second API 
                this.DataApi.getUserCountry1().subscribe(data => {
                    console.log("Call Second API for Fast, accurate, reliable");
                    if (data.data.country_name === 'Russia') {
                      
                      this.temp = data.data.country_name + 'n Federation (The)';
                      data.data.country_name = 'Russian';
                    } else if (data.data.country_name == 'United Kingdom')
                    {
                      this.temp = 'United Kingdom Of Great Britain And Northern Ireland (The)';
                    } else {
                      this.temp = data.data.country_name;
                    }
                    this.myCountry = data.data.country_name;
                    this.flagImage = this.flagImageInit + this.myCountry + '.png';
                    this.myCurrency = cc.country(this.temp)[0].code;
                    var temp2 = 'USD' + this.myCurrency;
                    for (let i = 0; i < this.Currencies.length; i++) {
                      if (this.Currencies[i][0] === temp2) {
                        this.rate = this.Currencies[i][1];
                        break;
                      }
                    }
                    this.currencySymbol = getSymbolFromCurrency(this.myCurrency);
                    for (let i = 0; i< this.options.length; i++) {
                      if (this.options[i] == this.myCountry){
                        const parent = this;
                        cl.getCountryLanguages(this.countries[i].IOS, function (err, languages){
                          if (err) {
                            throw(err)
                          } else {
                            const lanCode = languages[0].iso639_1.toUpperCase();
                            for (let k = 0; k< parent.optionslanguage.length; k++){
                              if (parent.optionslanguage[k].includes(lanCode)) {
                                parent.myLanguage = parent.optionslanguage[k];
                              }
                            }
                            if (parent.myLanguage == ''){
                              parent.myLanguage = parent.optionslanguage[0];
                            }
                          }
                        })
                      }
                    }
                  });
              });
          
        }
      });
    }
    




    
    //Get Product
    this.productData.getProduct(this.slug).subscribe(test => {
        //this.productType1 = test.typeQuantity;
        //this.subTotal1 = this.productType1[0].totalAmount;
        //this.Total1 = this.productType1[0].dueAmount;
        this.accessories = test.accessories;
        for (let i = 0; i< this.accessories.length; i++){
          if (this.accessories[i].specialOffer){
            this.specialOfferProduct = this.accessories[i];
          } else if (this.accessories[i].mostPopular) {
            this.mostPopular = this.accessories[i];
          } else {
            this.mainAccessories.push(this.accessories[i]);
          }
          
        }
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
  }
  private _filterCountry(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filterCountry1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterState(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.States.filter(state => state.toLowerCase().includes(filterValue));
  }
  private _filterLanguage(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionslanguage.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.States.filter(state => state.toLowerCase().includes(filterValue));
  }
  private _filterCurrencies(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionscurrencies.filter(currency => currency.toLowerCase().includes(filterValue));
  }
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  increment(i) {
    this.value[i]++;
    if (this.value[i] > 0) {
      this.minus_disabled[i] = false;
    }
    // this.subTotal2 -= this.subTotalAccessories[i];
    // this.subTotalAccessories[i] = this.accessories[i].priceMain * this.value[i];
    // this.subTotal2 += this.subTotalAccessories[i];
    // this.subTotal = this.subTotal1 + this.subTotal2;

    // this.Total2 -= this.totalAccessories[i];
    // this.totalAccessories[i] = this.accessories[i].priceNew * this.value[i];
    // this.Total2 += this.totalAccessories[i];
    // this.Total = this.Total1 + this.Total2;
    // this.saveMoney = this.subTotal - this.Total;
    // this.discount = Math.floor (this.saveMoney / this.subTotal * 100);
  }

  decrement(i) {
    this.value[i]--;
    if (this.value[i] < 1) {
      this.minus_disabled[i] = true;
    }
    // this.subTotal2 -= this.subTotalAccessories[i];
    // this.subTotalAccessories[i] = this.accessories[i].priceMain * this.value[i];
    // this.subTotal2 += this.subTotalAccessories[i];
    // this.subTotal = this.subTotal1 + this.subTotal2;

    // this.Total2 -= this.totalAccessories[i];
    // this.totalAccessories[i] = this.accessories[i].priceNew * this.value[i];
    // this.Total2 += this.totalAccessories[i];
    // this.Total = this.Total1 + this.Total2;
    // this.saveMoney = this.subTotal - this.Total;
    // this.discount = Math.floor (this.saveMoney / this.subTotal * 100);
  }

  increment1(i, p_index) {
    this.cartValue[p_index]++;
    this.cartProducts[i][2]++;
    this.cartProducts[i][4] = this.cartProducts[i][2] * this.cartProducts[i][3];
    this.total = 0;
    for (let k = 0; k< this.cartProducts.length; k++) {
      this.total += this.cartProducts[k][4];
    }
    if (this.cartValue[p_index] > 0) {
      this.cart_disable[p_index] = false;
    }
  }

  decrement1(i, p_index) {
    this.cartValue[p_index]--;
    this.cartProducts[i][2]--;
    this.cartProducts[i][4] = this.cartProducts[i][2] * this.cartProducts[i][3];
    this.total = 0;
    for (let k = 0; k< this.cartProducts.length; k++) {
      this.total += this.cartProducts[k][4];
    }
    if (this.cartValue[p_index] < 1) {
      this.cart_disable[p_index] = true;
    }
  }

  toggle() {
    if (this.expanded === true) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }
  }
  select() {
    var temp = this.myCountry;
    if (this.myCountry == 'Russian') {
      temp = 'Russian Federation (The)';
    } else if (this.myCountry == 'United Kingdom') {
      temp = 'United Kingdom Of Great Britain And Northern Ireland (The)';
    }
    this.myCurrency = cc.country(temp)[0].code;

    // Call Reliable Exchange Rates & Currency
    this.DataApi.getCurrencyRate().subscribe(data => {
        const result = data.data.quotes;
        // tslint:disable-next-line:only-arrow-functions
        this.Currencies = Object.keys(result).map(function(key) {
          return [key, result[key]];
        });
      });
  }

  selectCurrency() {
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

  confirm() {
    if ((localStorage.getItem('Country') != this.myCountry) || (localStorage.getItem('Language') != this.myLanguage) || (localStorage.getItem('Currency') != this.myCurrency)){
      localStorage.setItem('Country', this.myCountry);
      localStorage.setItem('Language', this.myLanguage);
      localStorage.setItem('Currency', this.myCurrency);
      var temp2 = 'USD' + this.myCurrency;
      for (let i = 0; i < this.Currencies.length; i++) {
        if (this.Currencies[i][0] === temp2) {
          this.rate = this.Currencies[i][1];
          break;
        }
      }
      this.currencySymbol = getSymbolFromCurrency(this.myCurrency);
      this.flagImage = this.flagImageInit + this.myCountry + '.png';
    }
    this.showConfirm = false;
    
  }

  switchEn() {
    this.myLanguage = this.optionslanguage[0];
  }

  clickCup(i) {
    this.clickCups[i] = true;
    for (let k = 0; k< 3; k++) {
      if (i != k) {
        this.clickCups[k] = false;
      }
    }
  }

  closeConfirm() {
    this.showConfirm = false;
  }

  showDiv() {
    var temp;
    var flag = false;
    var flag1 = false;
    if ((this.productIndex == 0)|| (this.productIndex == 1)){
      temp = this.productIndex + 2;
    } else if (this.productIndex == 2){
      temp = 1
    } else {
      temp = 0;
    }
    for (let k = 0; k< this.cartProducts.length; k++) {
      if (this.cartProducts[k][0] == this.productIndex) {
        this.cartProducts[k][2] += this.value[this.productIndex];
        this.cartProducts[k][4] = this.cartProducts[k][2] * this.cartProducts[k][3];
        this.cartValue[this.productIndex] = this.cartProducts[k][2];

        flag = true;
        break;
      }
    }
    if (flag == false){
      if (this.value[this.productIndex] == 0){
        this.value[this.productIndex] = 1;
      }
      this.cartProducts.push([this.productIndex, this.accessories[temp].title, this.value[this.productIndex], this.accessories[temp].priceNew, this.value[this.productIndex] * this.accessories[temp].priceNew]);
      
      this.cartValue[this.productIndex] = this.value[this.productIndex];
    }
    
    for (let k = 0; k< this.cartProducts.length; k++) {
      if (this.cartProducts[k][0] == 3) {
        this.cartProducts[k][2]++;
        this.cartProducts[k][4] = this.cartProducts[k][2] * this.cartProducts[k][3];
        this.cartValue[3] = this.cartProducts[k][2];
        flag1 = true;
        break;
      }
    }
    if (flag1 == false){
      this.cartProducts.push([3, this.accessories[0].title, 1, this.accessories[0].priceNew, this.accessories[0].priceNew]);
      this.cartValue[3] = 1;
    }
    this.total = 0;
    for (let k = 0; k< this.cartProducts.length; k++) {
      this.total += this.cartProducts[k][4];
    }
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    localStorage.setItem('cartValue', JSON.stringify(this.cartValue));
    localStorage.setItem('total', this.total.toString());
    this.cart_disable[this.productIndex] = false;
    this.cart_disable[3] = false;
    this.value[this.productIndex] = 0;
    this.minus_disabled[this.productIndex] = true;
    this.showCheckout = true;
  }

  showDiv1() {
    var temp;
    var flag = false;
    if ((this.productIndex == 0)|| (this.productIndex == 1)){
      temp = this.productIndex + 2;
    } else if (this.productIndex == 2){
      temp = 1
    } else {
      temp = 0;
    }
    for (let k = 0; k< this.cartProducts.length; k++) {
      if (this.cartProducts[k][0] == this.productIndex) {
        this.cartProducts[k][2] += this.value[this.productIndex];
        this.cartProducts[k][4] = this.cartProducts[k][2] * this.cartProducts[k][3];
        this.cartValue[this.productIndex] = this.cartProducts[k][2];

        flag = true;
        break;
      }
    }
    if (flag == false){
      if (this.value[this.productIndex] == 0){
        this.value[this.productIndex] = 1;
      }
      this.cartProducts.push([this.productIndex, this.accessories[temp].title, this.value[this.productIndex], this.accessories[temp].priceNew, this.value[this.productIndex] * this.accessories[temp].priceNew]);
      
      this.cartValue[this.productIndex] = this.value[this.productIndex];
    }
    this.total = 0;
    for (let k = 0; k< this.cartProducts.length; k++) {
      this.total += this.cartProducts[k][4];
    }

    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    localStorage.setItem('cartValue', JSON.stringify(this.cartValue));
    localStorage.setItem('total', this.total.toString());
    this.cart_disable[this.productIndex] = false;
    this.value[this.productIndex] = 0;
    this.minus_disabled[this.productIndex] = true;
    this.showCheckout = true;
  }

  orderNow(i) {
    
    this.productIndex = i;
    
    
  }

  removeProduct(i) {
    this.removeItem[i] = true;
    this.cartValue[this.cartProducts[i][0]] = 0;
    this.cartProducts.splice(i, 1);
    this.total = 0;
    for (let k = 0; k< this.cartProducts.length; k++) {
      this.total += this.cartProducts[k][4];
    }
    console.log(this.total);
    console.log(this.cartProducts);
    localStorage.setItem('cartProducts', JSON.stringify(this.cartProducts));
    
    localStorage.setItem('cartValue', JSON.stringify(this.cartValue));
    localStorage.setItem('total', this.total.toString());
  }

  ddd(i) {
    this.minus_disabled[i] = false;
  }

  selectForState(option) {
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
    this.filteredStates = this.myControlState.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter1(value))
      );
  }


}
