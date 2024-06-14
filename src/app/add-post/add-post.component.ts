import { Component, OnInit } from "@angular/core";
import { Post } from "../data/post";
import { PostService } from "../services/post.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {env} from "../../env/env";
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";


@Component({
    selector: 'add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.css']
})

export class AddPost implements OnInit {
  private url = `${env.apiUrl}/v1`
  form: FormGroup;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService ) {
      this.form = this.fb.group({
        title: [
          '',
          [
            Validators.required,
            Validators.minLength(1),
            Validators.maxLength(20)
          ]
        ],
        categoryId: [
          '',
          [
            Validators.required,
            Validators.minLength(1)
          ]
        ],
        content: [
          '',
          [
            Validators.required,
            Validators.minLength(1)
          ]
        ]
      });
    }

    get title() {
        return this.form.controls['title'];
    }
    get categoryId() {
      return this.form.controls['categoryId'];
    }
    get content() {
      return this.form.controls['content'];
    }

  ngOnInit() {
    this.loadCategories();
    this.form.valueChanges.subscribe(values => {
      console.log("Form Values:", values);
    });
  }

  loadCategories() {
    this.http.get<any[]>(this.url + '/categories').subscribe(
      data => {
        this.categories = data;
        this.form.patchValue({ categoryId: this.categories.length > 0 ? this.categories[0].id : '' });
      },
      error => {
        console.error('Could not load categories', error);
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.http.post(this.url + '/posts', this.form.value).subscribe(
        response => {
          console.log('Post successful', response);
          // Notification de succès
          this.toastr.success('Post created successfully!', 'Success');
          // Redirection vers la page d'accueil
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error during post', error);
          this.toastr.error('Failed to create post.', 'Error'); // seulement si vous utilisez ngx-toastr
        }
      );
    }
  }
}
