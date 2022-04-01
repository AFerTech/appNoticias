import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { NewsResponse, Article,ArticlesByCategoryAndPage } from '../interfaces';
import { Observable } from 'rxjs';
import { map  } from 'rxjs/operators';





const apiKey= environment.apikey;
const apiUrl= environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class NewsService {

  private articlesByCategoryAndPage: ArticlesByCategoryAndPage ={}

  constructor( private http: HttpClient) { }

 private executeQuery<T>(endpoint: string){
   console.log('Peticion HTTP realizada');
   return this.http.get<T>(`${apiUrl} ${endpoint}`,{
     params: {
       apiKey:apiKey,
       country:'us',
     }
   })
 }





  getTopHeadlines():Observable<Article[]>{

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/everything?q=tesla&from=2022-02-28&sortBy`,{
      params:{
        apiKey: apiKey
      }
    }).pipe(
      map(({articles})=> articles)
    );

  }

  getTopHeadlinesByCategory (category:string, leadMore: boolean=false): Observable<Article[]>{
    return this.executeQuery<NewsResponse>(`https://newsapi.org/v2/everything?q=${category}`,)
    .pipe(
      map(({articles})=> articles)
    );


  }

  private getArticlesByCategory(category: string): Observable<Article[]>{

    if (Object.keys(this.articlesByCategoryAndPage).includes(category)){
    // ya existe
    // this.articlesByCategoryAndPage[category].page +=1;
    }else{
    // no existe
    this.articlesByCategoryAndPage[category]={
      page:0,
      articles:[]
    }

  }
  const page= this.articlesByCategoryAndPage[category].page+1;

  return this.executeQuery<NewsResponse>(`https://newsapi.org/v2/everything?q=${category}&page=${page}`)
  .pipe(
    map( ({articles})=> articles)
    );
  
}
}
