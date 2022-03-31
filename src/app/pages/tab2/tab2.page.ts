import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[]=['business','entertainment','general','health','science','sports','technology']
  public selectedCategory: string=this.categories[0];
  public articles: Article[]=[];
  
  constructor(private newsServiece:NewsService) {}

  ngOnInit() {
    this.newsServiece.getTopHeadlinesByCategory(this.selectedCategory).subscribe(articles =>{
     
      this.articles=[...this.articles, ...articles]
    });
  }

  segmentChanged( event: any){
    this.selectedCategory = event.detail.value;
    console.log(event.detail.value);
    this.newsServiece.getTopHeadlinesByCategory(this.selectedCategory).subscribe(articles =>{
      
      this.articles=[...articles]
    });
  }

}
