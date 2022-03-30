import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsResponse } from '../../interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  constructor( private newService : NewsService) {}

  ngOnInit() {
      this.newService.getTopHeadlines()
      .subscribe( articles =>{
        console.log(articles);
      });
  }

}
