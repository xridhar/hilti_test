import { EventService } from './../../services/event.service';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
// @ts-ignore
const $: any = window['$'];
@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  @ViewChild('modal') modal?: ElementRef;
  @ViewChild(DashboardComponent) dashboard?: DashboardComponent;

  constructor(private eventService: EventService) {}

  getID$ = new BehaviorSubject('');

  openModal(id?: any) {
    this.getID$.next(id);
    $(this.modal?.nativeElement).modal('show');
  }

  closeModal() {
    $(this.modal?.nativeElement).modal('hide');
  }

  deleteProfile() {
    this.eventService.deleteProfile(this.getID$.value).subscribe((res) => {
      this.eventService.profileList$ = this.eventService.getAllProfile();
      this.getID$.next('');
      this.closeModal();
    });
  }
}
