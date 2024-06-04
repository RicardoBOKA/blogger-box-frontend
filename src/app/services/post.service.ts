import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, of } from "rxjs";

import { POSTS, Post } from '../data/post'
import { env } from "../../env/env";
import { PostCreateInput } from "../data/post-create-input";

@Injectable()
export class PostService {
    
    private postUrl = `${env.apiUrl}/v1/posts` // `http://localhost:8080/v1/categories`
    
    constructor(private http:HttpClient) {}

    // ICI A ENLEVER NORMALEMENT
    // getPosts(): Observable<Post[]> {
    //     const posts = of(POSTS);
    //     return posts;
    // }
    // ICI A ENLEVER NORMALEMENT

    getAll(): Observable<Post[]> {
        return this.http.get<Post[]>(this.postUrl);
    }

    create(post: PostCreateInput): Observable<Post> {
        return this.http.post<Post>(this.postUrl, post);
    }

    update(post: Post): Observable<Post> {
        return this.http.put<Post>(this.postUrl, post)
            .pipe(
                catchError(this.handleError<Post>('update', post))
            );
    }

    delete(post: Post): Observable<boolean> {
        return this.http.delete<boolean>(`${this.postUrl}/${post.id}`);
    }

    protected handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(`${operation} failed: ${error.message}`, error)
            return of (result as T);
        }
    }
}