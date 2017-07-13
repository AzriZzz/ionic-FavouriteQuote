import { Component, OnInit } from '@angular/core';

import { AlertController } from "ionic-angular";
import { NavParams } from "ionic-angular";
import { Quote } from "../../data/quotes.interface";
import { QuotesService } from "../../services/quotes";


@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage  implements OnInit{
  quoteGroup: { category: string, quotes: Quote[], icon: string };

  constructor(
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private quoteServices: QuotesService ) {}

  ngOnInit(){
    this.quoteGroup = this.navParams.data;
  }

  // ionViewDidLoad(){
  //   this.quoteGroup = this.navParams.data;
  //   Add elvis operator (?) in tempalte to use this approach
  // }

  onAddToFavourites(selectedQuote: Quote){
    const alert = this.alertCtrl.create({
      title: 'Add Quote',
      subTitle: 'Are you sure?',
      message: 'Are you sure you want to add the quote?',
      buttons: [
        {
          text: 'Yes, go ahead',
          handler: () => {
            this.quoteServices.addQuoteToFavourites(selectedQuote);
          }
        },
        {
          text: 'No, I changed my mind!',
          role: 'cancel',
          handler: () => {
            console.log('Cancelled!')
          }
        }
      ]
    });
    alert.present()
  }

  onRemoveFromFavourites(quote: Quote){
    this.quoteServices.removeQuoteFromFavourites(quote);
  }

  isFavourite(quote: Quote){
    return this.quoteServices.isQuoteFavourite(quote);
  }
}
