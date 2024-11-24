import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {PageInfoComponent} from "../../components/page-info/page-info.component";
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';
import {UserFormComponent} from '../../components/user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    HeaderComponent,
    PageInfoComponent,
    UserFormComponent
  ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  title = `Update`;
  returnUrl = '/';
  id: number | undefined;
  user: User | undefined;

  constructor(private _route: ActivatedRoute, private _userService: UserService, private _router: Router) {
  }

  ngOnInit() {
    let userId = this._route.snapshot.paramMap.get('id');
    if (userId) {
      this.id = parseInt(userId, 10);
      this._userService.GetUserById(this.id).subscribe(response => {
        this.user = response.data;
        this.title = `Update - ${this.user?.name}`;
      });
    }
  }

  updateUser(user: User) : void {
    this._userService.UpdateUser(user).subscribe(response => {
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
