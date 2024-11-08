import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {UserFormComponent} from '../../components/user-form/user-form.component';
import {RouterModule, Router} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faReply} from '@fortawesome/free-solid-svg-icons';
import {PageInfoComponent} from '../../components/page-info/page-info.component';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HeaderComponent,
    UserFormComponent,
    RouterModule,
    FaIconComponent,
    PageInfoComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title = 'Register User';
  returnUrl = '/';
  protected readonly faReply = faReply;

  constructor(private _userService: UserService, private _router: Router) {
  }

  createUser(user: User) : void {
    this._userService.CreateUser(user).subscribe(response => {
      if (response.status) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.message,
          showConfirmButton: false,
          timer: 3000
        }).then(() => {
          this._router.navigate(['/']);
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: response.message,
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }
}
