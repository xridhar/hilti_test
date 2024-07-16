import { AlertComponent } from './../../components/alert/alert.component';
import { interval, Observable, take, tap } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ICreateProfile, IList, IProfileList } from './../../model/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    NgxSpinnerModule,
    AsyncPipe,
    RouterModule,
    AlertComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  // profileList: IProfileList[] = [];
  @ViewChild(ModalComponent) modal?: ModalComponent;
  @ViewChild(AlertComponent) _alert?: AlertComponent;
  email = localStorage.getItem('email');

  constructor(
    public eventService: EventService,
    private authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getProfiles();
  }

  getProfiles() {
    this.eventService.profileList$ = this.eventService.getAllProfile();
  }

  createProfile(data: ICreateProfile) {
    this.eventService.createProfile(data).subscribe((res) => {});
  }

  addProfile() {
    this.modal?.openModal('Add Profile', 'Add');
  }

  updateProfile(id: any) {
    this.modal?.openModal('Update Profile', 'Update', id);
  }

  openAlert(id: any) {
    this._alert?.openModal(id);
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['home']);
  }
}
