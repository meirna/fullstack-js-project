import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Event, Image } from 'src/app/shared/models';
import { EventService } from '../../shared/event.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'],
})
export class EventFormComponent implements OnInit {
  event?: Event;
  eventSubject?: BehaviorSubject<Event | undefined>;
  subscription?: Subscription;
  image?: Image;
  submitted = false;
  deleted = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private service: EventService,
    private route: ActivatedRoute
  ) {}

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255)]],
    address: ['', [Validators.required, Validators.maxLength(255)]],
    city: ['', [Validators.required, Validators.maxLength(255)]],
    datetime: [new Date(), [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required, Validators.maxLength(8000)]],
    image: [''],
  });

  ngOnInit() {
    this.subscription = this.service.eventSubject.subscribe((res) => {
      if (res) {
        this.error = false;
        this.event = res;
      } else if (this.submitted) {
        this.error = true;
      }

      let d;
      if (this.event?.datetime) {
        d = new Date(this.event?.datetime).toISOString();
        d = d.substring(0, d.length - 1);
      }
      this.form.controls['name'].setValue(this.event?.name);
      this.form.controls['address'].setValue(this.event?.address);
      this.form.controls['city'].setValue(this.event?.city);
      this.form.controls['datetime'].setValue(d);
      this.form.controls['description'].setValue(this.event?.description);
    });

    if (this.route.snapshot.paramMap.get('id') && !this.event?._id) {
      this.eventSubject = this.service.getEvent(
        this.route.snapshot.paramMap.get('id')!
      );
    }
  }

  onFileChanged(e: any) {
    this.image = undefined;
    const file = e.target.files[0];

    if (
      (file.type === 'image/png' ||
        file.type === 'image/jpeg' ||
        file.type === 'image/jpg') &&
      file.size / (1024 * 1024) <= 2
    ) {
      this.error = false;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = new Image(file.name, reader.result as string);
      };
    } else {
      e.target.value = '';
      this.error = true;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitted = true;
      const created = new Event(
        this.form.value.name,
        this.form.value.datetime,
        this.form.value.city,
        this.form.value.address,
        this.form.value.description,
        this.image
      );
      created._id = this.event?._id;

      if (this.event?._id) this.service.updateEvent(created);
      else this.service.createEvent(created);
      window.scroll({
        top: 0,
      });
    }
  }

  onDelete() {
    this.submitted = true;
    this.deleted = true;
    this.service.deleteEvent(this.event?._id!);
    window.scroll({
      top: 0,
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
