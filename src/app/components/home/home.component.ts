import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../header/header.component';
import {UserService} from '../../services/user.service';
import {User} from '../../models/User';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faUser, faUserPen, faUserXmark, faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FaIconComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  faUser = faUser;
  faUserPen = faUserPen;
  faUserXmark = faUserXmark;
  faUserPlus = faUserPlus;

  users: User[] = [];
  filteredUsers: User[] = [];

  constructor(private _userService: UserService) {

  }

  ngOnInit(): void {
        this._userService.GetUsers().subscribe(response => {
          this.users = response.data;
          this.filteredUsers = response.data;
        });
    }
}
