import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Input() isLoading = false;
  @Output() isLoadingChange = new EventEmitter<boolean>();

  role = parseInt(this.getCookie('role_id'));

  constructor(
    private router: Router
  ) {

  }

  onLogout(e: Event) {
    this.isLoadingChange.emit(true);
    setTimeout(() => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.isLoadingChange.emit(false);
      this.router.navigate(['/login']);
    }, 3000);
  }

  getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
  }
}
