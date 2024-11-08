import { Component } from '@angular/core';
import {Input} from '@angular/core';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faReply, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-page-info',
  standalone: true,
  imports: [
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './page-info.component.html',
  styleUrl: './page-info.component.css'
})
export class PageInfoComponent {
  @Input() title = '';
  @Input() returnUrl = '';
  protected readonly faReply = faReply;
  protected readonly faUserPlus = faUserPlus;
}
