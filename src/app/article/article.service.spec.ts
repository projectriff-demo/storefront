import {TestBed} from '@angular/core/testing';

import {ArticleService} from './article.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Article} from './article';

describe('ArticleService', () => {
  let httpMock: HttpTestingController;
  let service: ArticleService;
  const article1 = {
    sku: 'a SKU1',
    name: 'name1',
    description: 'description1',
    priceInUsd: 1,
    imageUrl: 'https://giphygifs.s3.amazonaws.com/media/kKdgdeuO2M08M/giphy.gif',
    quantity: 5
  } as Article;
  const article2 = {
    sku: 'a SKU2',
    name: 'name2',
    description: 'description2',
    priceInUsd: 2,
    quantity: 7
  } as Article;
  const article3 = {
    sku: 'a SKU3',
    name: 'name3',
    description: 'description3',
    priceInUsd: 3,
    quantity: 0
  } as Article;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ArticleService);
  });

  it('should list articles in stock', (done) => {
    service.findAll().subscribe((articles) => {
      expect(articles).toEqual([article1, article2]);
      done();
    });

    const req = httpMock.expectOne(`/api/article/`);
    expect(req.request.method).toBe('GET');
    req.flush({
      _embedded: {
        articles: [{
          sku: article1.sku,
          name: article1.name,
          description: article1.description,
          priceInUsd: article1.priceInUsd,
          imageUrl: article1.imageUrl,
          quantity: article1.quantity,
          _links: {
            self: {
              href: 'http://localhost:8080/api/article/1'
            },
            article: {
              href: 'http://localhost:8080/api/article/1'
            }
          }
        }, {
          sku: article2.sku,
          name: article2.name,
          description: article2.description,
          priceInUsd: article2.priceInUsd,
          quantity: article2.quantity,
          _links: {
            self: {
              href: 'http://localhost:8080/api/article/2'
            },
            article: {
              href: 'http://localhost:8080/api/article/2'
            }
          }
        }, {
          sku: article3.sku,
          name: article3.name,
          description: article3.description,
          priceInUsd: article3.priceInUsd,
          quantity: article3.quantity,
          _links: {
            self: {
              href: 'http://localhost:8080/api/article/3'
            },
            article: {
              href: 'http://localhost:8080/api/article/3'
            }
          }
        }]
      },
      _links: {
        self: {
          href: 'http://localhost:8080/api/article'
        },
        profile: {
          href: 'http://localhost:8080/api/profile/article'
        }
      }
    }, {
      headers: {
        'Content-Type': 'application/hal+json'
      }
    });
  });
});
