import { Component, Input } from '@angular/core';
import { Article } from '../../interfaces';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { browser } from 'protractor';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent  {
  @Input() article: Article;
  @Input() index:number;

  constructor(
    private appBrowser: InAppBrowser,
    private platform: Platform) { }

  openArticle(){

    if(this.platform.is('ios') || this.platform.is('android')){
      
      const browser = this.appBrowser.create(this.article.url);
      browser.show();
      return;
    }
     window.open(this.article.url,'_blank');
  }

  

}
