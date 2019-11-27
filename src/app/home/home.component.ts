import {Component, OnInit} from '@angular/core';
import {ArticleService} from '../article/article.service';
import {Observable} from 'rxjs';
import {Article} from '../article/article';
import {CartService} from '../cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles$: Observable<Article[]>;

  constructor(private articleService: ArticleService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.articles$ = this.articleService.findAll();
  }

  addToCart(article: Article) {
    this.cartService.addItem(article);
  }
}
