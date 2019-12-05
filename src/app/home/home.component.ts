import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleService} from '../article/article.service';
import {Observable, Subscription} from 'rxjs';
import {Article} from '../article/article';
import {CartService} from '../cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  articles$: Observable<Article[]>;
  constructor(private articleService: ArticleService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.articles$ = this.articleService.findAll();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addToCart(article: Article) {
    this.subscription = this.cartService.addItem(article).subscribe();
  }
}
