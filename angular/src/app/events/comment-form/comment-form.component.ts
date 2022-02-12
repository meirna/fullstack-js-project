import { Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Comment, Event } from 'src/app/shared/models';
import { EventService } from '../../shared/event.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css'],
})
export class CommentFormComponent {
  @Input() event?: Event;

  constructor(private fb: FormBuilder, private service: EventService) {}

  form = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(255)]],
  });

  onSubmit() {
    if (this.form.valid) {
      this.service.createComment(
        new Comment(this.event?._id!, this.form.value.text)
      );
      this.form.reset({ text: '' });
    }
  }
}
