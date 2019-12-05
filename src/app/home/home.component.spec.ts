import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeComponent} from './home.component';
import {ArticleService} from '../article/article.service';
import {of, ReplaySubject} from 'rxjs';
import {Article} from '../article/article';
import {CartService} from '../cart/cart.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dom;
  let articles$;
  const article1 = {
    sku: 'SKU1',
    name: 'name1',
    description: 'description1',
    priceInUsd: 1
  } as Article;
  const article2 = {
    sku: 'SKU2',
    name: 'name2',
    description: 'description2',
    priceInUsd: 2
  } as Article;
  let cartServiceSpy: any;

  beforeEach(async(() => {
    articles$ = new ReplaySubject<Article[]>(1);
    const articleServiceSpy = jasmine.createSpyObj<ArticleService>(['findAll']);
    articleServiceSpy.findAll.and.returnValue(articles$.asObservable());
    cartServiceSpy = jasmine.createSpyObj<CartService>(['addItem']);
    cartServiceSpy.addItem.and.returnValue(of());
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {provide: ArticleService, useValue: articleServiceSpy},
        {provide: CartService, useValue: cartServiceSpy},
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    dom = fixture.debugElement.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('with articles =>', () => {
    beforeEach(() => {
      articles$.next([article1, article2]);
      fixture.detectChanges();
    });

    it('should list articles', () => {
      expect(Array.from(dom.querySelectorAll('.card text'))
        .map((title: any) => title.textContent))
        .toEqual([article1.name, article2.name]);
    });

    it('should display an "add to cart" button for each article', () => {
      expect(dom.querySelector(`#article-${article1.sku} .add-to-cart button`))
        .toBeTruthy('add to cart button should be there');
    });

    it('should add article to cart', () => {
      const addToCart = dom.querySelector(`#article-${article1.sku} .add-to-cart button`);
      addToCart.click();

      expect(cartServiceSpy.addItem).toHaveBeenCalledWith(article1);
    });
  });
});
