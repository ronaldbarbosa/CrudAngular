import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {PageInfoComponent} from "../../components/page-info/page-info.component";
import {ActivatedRoute} from '@angular/router';
import {User} from '../../models/User';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-update',
  standalone: true,
    imports: [
        HeaderComponent,
        PageInfoComponent
    ],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent {
  title = `User\'s Update`;
  returnUrl = '/';
  id: number | undefined;
  user: User | undefined;

  constructor(private route: ActivatedRoute, private _userService: UserService) {
  }

  ngOnInit() {
    let userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.id = parseInt(userId, 10);
      this._userService.GetUserById(this.id).subscribe(response => {
        this.user = response.data;
        this.title = `User's Update - ${this.user?.name}`;
      });
    }
  }
}
