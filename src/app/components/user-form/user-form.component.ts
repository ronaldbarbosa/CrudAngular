import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {RouterModule} from '@angular/router';
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
  @Input() user? : User;

  userForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && this.user) {
      this.populateForm(this.user);
    }
  }

  protected readonly faUserPlus = faUserPlus;

  initForm(): void {
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

  populateForm(user: User) : void {
    console.log(user);
    this.userForm.patchValue({
      id: user.id,
      name: user.name,
      cpf: user.cpf,
      email: user.email,
      role: user.role,
      salary: user.salary,
      active: user.active,
    });
  }

  submit(): void {
    this.userEventEmitter.emit(this.userForm.value);
  }
}
