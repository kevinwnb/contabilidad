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

  constructor(
    private router: Router
  ) { }
  onLogout(e: Event) {
    this.isLoadingChange.emit(true);
    setTimeout(() => {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      this.isLoadingChange.emit(false);
      this.router.navigate(['/login']);
    }, 3000);
  }
}
