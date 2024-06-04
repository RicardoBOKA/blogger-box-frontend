import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

import { POSTS, Post } from '../data/post'
import { Category } from "../data/category";
import { CategoryCreateInput } from '../data/category-create-input';
import { env } from "../../env/env";


@Injectable()
export class CategoryService {
    
    private categoriesUrl = `${env.apiUrl}/v1/categories` // `http://localhost:8080/v1/categories`

    constructor(private http:HttpClient) {}

    getAll(): Observable<Category[]> {
        return this.http.get<Category[]>(this.categoriesUrl);
    }

    create(category: CategoryCreateInput): Observable<Category> {
        return this.http.post<Category>(this.categoriesUrl, category);
    }

    update(category: Category): Observable<Category> {
        return this.http.put<Category>(this.categoriesUrl, category)
            .pipe(
                catchError(this.handleError<Category>('update', category))
            );
    }

    delete(category: Category): Observable<boolean> {
        return this.http.delete<boolean>(`${this.categoriesUrl}/${category.id}`);
    }

    protected handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`, error)
            return of (result as T);
        }
    }
}