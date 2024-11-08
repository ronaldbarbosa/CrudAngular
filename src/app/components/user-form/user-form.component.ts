import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {RouterLink, RouterModule} from '@angular/router';
import {InputComponent} from '../forms/input/input.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {User} from '../../models/User';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink,
    InputComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  @Output() userEventEmitter = new EventEmitter<User>();

  userForm!: FormGroup;

  ngOnInit(): void {
      this.userForm = new FormGroup({
        id: new FormControl(0),
        name: new FormControl(''),
        cpf: new FormControl(''),
        email: new FormControl(''),
        role: new FormControl(''),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        salary: new FormControl(0),
        active: new FormControl(false),
      });
  }
  protected readonly faUserPlus = faUserPlus;

  submit(): void {
    this.userEventEmitter.emit(this.userForm.value);
  }
}
