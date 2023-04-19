import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.cartifyApiUrl + '/products';

  private categoryUrl = environment.cartifyApiUrl + '/product-category';

  sortCriteria: Subject<string> = new Subject<string>();

  constructor(private httpClient: HttpClient) {}

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  // need to build URL based on category id, page and size
  getProductListPaginate(
    page: number,
    pageSize: number,
    categoryId: number,
    sortCriteria: string
  ): Observable<GetResponseProducts> {
    let searchUrl = '';
    if (sortCriteria == "name") {
      searchUrl = `${this.baseUrl}/search/findByCategoryIdOrderByName?id=${categoryId}&page=${page}&size=${pageSize}`;
    }
    if (sortCriteria == "priceAsc") {
      searchUrl = `${this.baseUrl}/search/findByCategoryIdOrderByUnitPriceAsc?id=${categoryId}&page=${page}&size=${pageSize}`;
    }
    if (sortCriteria == "priceDesc") {
      searchUrl = `${this.baseUrl}/search/findByCategoryIdOrderByUnitPriceDesc?id=${categoryId}&page=${page}&size=${pageSize}`;
    }
    console.log(`Getting products from - ${searchUrl}`)
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  // getProductList(categoryId: number, sortCriteria: string): Observable<Product[]> {
  //   const searchUrl = '';
  //   if (sortCriteria == "name") {
  //     const searchUrl = `${this.baseUrl}/search/findByCategoryOrderByName?id=${categoryId}`;
  //   }
  //   if (sortCriteria == "priceAsc") {
  //     const searchUrl = `${this.baseUrl}/search/findByCategoryOrderByUnitPriceAsc?id=${categoryId}`;
  //   }
  //   if (sortCriteria == "priceDesc") {
  //     const searchUrl = `${this.baseUrl}/search/findByCategoryOrderByUnitPriceDesc?id=${categoryId}`;
  //   }
  //   return this.getProducts(searchUrl);
  // }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  // need to build URL based on keyword, page and size
  searchProductsPaginate(
    page: number,
    pageSize: number,
    keyword: string
  ): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponseProductCategory>(this.categoryUrl)
      .pipe(map((response) => response._embedded.productCategory));
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response._embedded.products));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
