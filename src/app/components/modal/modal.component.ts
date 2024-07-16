import { DashboardComponent } from './../../pages/dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faWarning } from '@fortawesome/free-solid-svg-icons';
import { ICreateProfile } from '../../model/model';
import { EventService } from '../../services/event.service';
import { BehaviorSubject } from 'rxjs';

// @ts-ignore
const $: any = window['$'];
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  faCheck = faCheck;
  faWarning = faWarning;
  faIcon: any = '';
  isSuccess: boolean = false;
  isError: boolean = false;
  actionBtnLabel = '';
  actionUrl = '';
  idType = '';
  getID$ = new BehaviorSubject('');

  constructor(public eventService: EventService) {}

  @ViewChild('modal') modal?: ElementRef;
  @ViewChild(DashboardComponent) dashboard?: DashboardComponent;

  profileForm: any = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(200),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(200),
    ]),
    age: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(1),
      Validators.maxLength(3),
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
    ]),
    country: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(20),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(9),
      Validators.maxLength(11),
    ]),
  });

  openModal(title: any, buttonLabel: any, id?: any) {
    if (id !== '' && id !== undefined) {
      this.getID$.next(id);
      this.eventService.profileListById$ = this.eventService.getProfileById(id);
      this.eventService.profileListById$.subscribe((res) => {
        this.profileForm.setValue({
          firstName: res.firstName,
          lastName: res.lastName,
          age: res.age,
          city: res.city,
          country: res.country,
          phone: res.phone,
        });
      });
    } else {
      this.getID$.next('');
    }
    this.actionBtnLabel = buttonLabel;
    $(this.modal?.nativeElement).modal('show');
    $('#modalLabel').text(
      id === id && id !== undefined ? title + ' - ' + id : title
    );
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get age() {
    return this.profileForm.get('age');
  }

  get city() {
    return this.profileForm.get('city');
  }

  get country() {
    return this.profileForm.get('country');
  }

  get phone() {
    return this.profileForm.get('phone');
  }

  closeModal() {
    this.profileForm.reset();
    $(this.modal?.nativeElement).modal('hide');
    this.getID$.next('');
  }

  onSubmit() {
    const data: ICreateProfile = this.profileForm.value;
    if (this.getID$.value !== '') {
      this.eventService.updateProfile(this.getID$.value, data).subscribe(() => {
        this.eventService.profileList$ = this.eventService.getAllProfile();
        this.closeModal();
      });
    } else {
      this.eventService.createProfile(data).subscribe((res) => {
        this.eventService.profileList$ = this.eventService.getAllProfile();
        this.getID$.next('');
        this.closeModal();
      });
    }
  }
}
