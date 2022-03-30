import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { NewsResponse, Article } from '../interfaces';
import { Observable } from 'rxjs';
import { map  } from 'rxjs/operators';




const apiKey= environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient) { }


  getTopHeadlines():Observable<Article[]>{

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/everything?q=tesla&from=2022-02-28&sortBy=publishedAt&apiKey`,{
      params:{
        apiKey: apiKey
      }
    }).pipe(
      map(({articles})=> articles)
    );

  }
}
