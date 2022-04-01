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
  
  constructor(private newsService:NewsService) {}

  ngOnInit() {
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe(articles =>{
     
      this.articles=[...articles]
    });
  }

  segmentChanged( event: Event){

    this.selectedCategory = (event as CustomEvent).detail.value;
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory).subscribe(articles =>{
      
      this.articles=[...articles]
    })
  }

  loadData(event:any){
    this.newsService.getTopHeadlinesByCategory(this.selectedCategory, true)
    .subscribe( articles =>{


      if (articles.length===this.articles.length){
        event.target.disable= true;
        return;
      }
      this.articles=articles;

      event.target.complete();
    })
  }

}
