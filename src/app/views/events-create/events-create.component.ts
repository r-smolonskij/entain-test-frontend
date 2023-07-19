import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sportsTypesList, statusesTypesList } from 'src/app/constants';
import { Event } from 'src/app/models/Event';
import { Sports, SportsType } from 'src/app/models/Sports';
import { Status, StatusType } from 'src/app/models/Status';
import { EventsService } from 'src/app/services/events.service';




@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.css']
})
export class EventsCreateComponent {
  loading: boolean = false;
  sportsItems: Sports[] = sportsTypesList;
  statusesItems: Status[] = statusesTypesList;
  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    sport: new FormControl<SportsType>(this.sportsItems[0].value, [Validators.required]),
    status: new FormControl<StatusType>(this.statusesItems[0].value, [Validators.required]),
    startDateTime: new FormControl('', [Validators.required]),
    finishDateTime: new FormControl('', [Validators.required]),
  });

  constructor( private router: Router, private eventsService:EventsService){}

  onDateRangeChange() {
    let startDateTime = this.startDateTimeField?.value ? new Date(this.startDateTimeField.value).getTime() : 0  ;
    let finishDateTime = this.finishDateTimeField?.value ? new Date(this.finishDateTimeField.value).getTime() : 0;
    if (startDateTime > finishDateTime && this.startDateTimeField?.value) {
      this.createForm.controls['finishDateTime'].setValue(this.startDateTimeField.value);
    }
  }

  onSubmit():void {
    this.createForm.markAllAsTouched();
    if (this.createForm.valid && this.startDateTimeField?.value && this.finishDateTimeField?.value) {
      this.loading = true;
      let formValue = this.createForm.value;
      let newEvent: Event = {
        name: formValue.name || "",
        sport: formValue.sport || this.sportsItems[0].value,
        status: formValue.status || this.statusesItems[0].value,
        startTime: new Date(this.startDateTimeField.value),
        finishTime: new Date(this.finishDateTimeField.value)
      }
      this.eventsService.createEvent(newEvent).subscribe(event => {
        this.router.navigateByUrl("/events")
      });
    }
  }

  get nameField() { return this.createForm.get('name'); }
  get startDateTimeField() { return this.createForm.get('startDateTime'); }
  get finishDateTimeField() { return this.createForm.get('finishDateTime'); }

}
