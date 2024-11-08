import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../components/header/header.component';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser, faUserPen, faUserXmark, faUserPlus, faReply} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import {RouterModule} from '@angular/router';
import {PageInfoComponent} from '../../components/page-info/page-info.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FaIconComponent,
    RouterModule,
    PageInfoComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  faUser = faUser;
  faUserPen = faUserPen;
  faUserXmark = faUserXmark;
  faUserPlus = faUserPlus;
  faReply = faReply;

  users: User[] = [];
  filteredUsers: User[] = [];
  title = 'Users';

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    this._userService.GetUsers().subscribe(response => {
      this.users = response.data;
      this.filteredUsers = response.data;
    });
  }

  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const searchValue = target.value.toLowerCase();

    this.filteredUsers = this.users.filter(user => user.name.toLowerCase().includes(searchValue));
  }

  deleteUser(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonColor: 'rgb(100 116 139)',
      cancelButtonColor: 'rgb(190 18 60)',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteUserConfirmed(id);
      }
    });
  }

  deleteUserConfirmed(id: number) {
    this._userService.DeleteUser(id).subscribe(response => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.message,
        showConfirmButton: false,
        timer: 3000
      });
      if (response.status) {
        this._userService.GetUsers().subscribe(response => {
          this.users = response.data;
          this.filteredUsers = response.data;
        });
      }
    });
  }
}
