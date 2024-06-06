import { Component, OnInit } from "@angular/core";
import { Post } from "../data/post";
import { PostService } from "../services/post.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient} from "@angular/common/http";
import {env} from "../../env/env";

@Component({
    selector: 'add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.CSS']
})

export class AddPost implements OnInit {
  private url = `${env.apiUrl}/v1`
  form: FormGroup;
  categories: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
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
    console.log("Form Validity: ", this.form.valid);
    console.log("Title Control State: ", this.form.get('title'));
    console.log("Category Control State: ", this.form.get('categoryId'));
    console.log("Content Control State: ", this.form.get('content'));
    console.log("this.categories" + this.categories);

    if (this.form.valid) {
      this.http.post(this.url +'/posts', this.form.value

      ).subscribe(
        response => {
          console.log('Post successful', response);
          // Actions à effectuer après une soumission réussie
          //Animation de validation pq pas
        },
        error => {
          console.error('Error during post', error);
          // Actions à effectuer en cas d'erreur
        }
      );
    }
  }
}
