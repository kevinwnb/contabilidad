import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
  days = Array.from({ length: this.daysInThisMonth() }, (_, i) => i + 1);
  weekday = this.weekdayOfFirstDay();
  daysBeforeCurrent = Array.from({ length: this.weekday - 1 }, (_, i) => i + 1);
  daysAfterCurrent = Array(7 - this.weekday)
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  currentMonth = this.monthNames[new Date().getMonth()];

  daysInThisMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  }

  weekdayOfFirstDay() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1).getDay();
  }

  daysInNextMonth() {
    var now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 2, 0).getDate();
  }
}
