import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  title = 'header works!';

  setUpperCase(event: any) {
    this.title = event.toUpperCase();
  }
}
