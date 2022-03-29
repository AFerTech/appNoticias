import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { NewsResponse } from '../interfaces';



const apiKey= environment.apikey;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor( private http: HttpClient) { }


  getTopHeadlines(){

    return this.http.get<NewsResponse>(`https://newsapi.org/v2/everything?q=tesla&from=2022-02-28&sortBy=publishedAt&apiKey=${apiKey}`);

  }
}
