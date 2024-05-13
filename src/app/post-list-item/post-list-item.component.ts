import { Component, Input } from "@angular/core";
import { Post } from "../data/post";

@Component({
    selector: 'app-post-list-item',
    templateUrl: './post-list-item.component.html',
    styleUrls: ['./post-list-item.component.CSS']
})

export class PostListItemComponent {
    @Input()
    post!: Post;
}