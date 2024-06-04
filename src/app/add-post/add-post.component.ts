import { Component, OnInit } from "@angular/core";
import { Post } from "../data/post";
import { PostService } from "../services/post.service";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
    selector: 'add-post',
    templateUrl: './add-post.component.html',
    styleUrls: ['./add-post.component.CSS']
})

export class AddPost {
    form = this.fb.group({
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur',
        },
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
        //   hasUpperCase(),
        //   hasLowerCase(),
        //   hasNumeric(),
        ],
      ],
      title: [
        '',
        [
            Validators.required,
            Validators.minLength(8)
        ],
      ],
      content: [
        '',
        [
            Validators.required,
            Validators.minLength(8)
        ]
      ],
      category: [
        '',
        [
            Validators.required,
            Validators.minLength(8)
        ]
      ]      
    });
  
    constructor(private fb: FormBuilder) {}
  
    get email() {
      return this.form.controls['email'];
    }
  
    get password() {
      return this.form.controls['password'];
    }

    get title() {
        return this.form.controls['title'];
    }
    
    get content() {
    return this.form.controls['content'];
    }

    get category() {
        return this.form.controls['content'];
    }


    
  }
  