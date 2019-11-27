import {Injectable} from '@angular/core';
import {Article} from './article';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  private static mapFromApi(article: any) {
    const result = {
      sku: article.sku,
      name: article.name,
      description: article.description,
      priceInUsd: article.priceInUsd,
      quantity: article.quantity,
    } as Article;
    if (article.imageUrl) {
      result.imageUrl = article.imageUrl;
    }
    return result;
  }

  public findAll(): Observable<Article[]> {
    return this.http.get('/api/article/')
      .pipe(
        filter((_) => _ != null),
        map((data: any) => {
          return data._embedded.articles
            .map(ArticleService.mapFromApi)
            .filter(article => article.quantity > 0);
        })
      );
  }
}
