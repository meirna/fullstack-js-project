import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comment, Event } from 'src/app/models';
import { EventService } from '../event.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent implements OnInit {
  @Input() event?: Event;

  constructor(private fb: FormBuilder, private service: EventService) {}

  form = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(255)]],
  });

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.valid) {
      this.service.createComment(
        new Comment(this.event?._id!, this.form.value.text)
      );
      this.form.reset({ text: '' });
    }
  }
}
