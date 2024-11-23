import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {RouterLink, RouterModule} from '@angular/router';
import {InputComponent} from '../forms/input/input.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {User} from '../../models/User';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    FaIconComponent,
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
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        cpf: new FormControl('', [Validators.required, Validators.minLength(3)]),
        email: new FormControl('', [Validators.required, Validators.email]),
        role: new FormControl('', [Validators.required]),
        password: new FormControl(''),
        confirmPassword: new FormControl(''),
        salary: new FormControl(0, [Validators.required]),
        active: new FormControl(false, [Validators.required]),
      });
  }
  protected readonly faUserPlus = faUserPlus;

  submit(): void {
    this.userEventEmitter.emit(this.userForm.value);
  }
}
