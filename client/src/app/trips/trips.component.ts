import { Component, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
  error: string;
  entries: any[] = [];

  modalDate: Date = new Date();
  days = Array.from({ length: this.daysInThisMonth() }, (_, i) => i + 1);
  weekday = this.weekdayOfFirstDay();
  daysBeforeCurrent = Array.from({ length: this.weekday - 1 }, (_, i) => i + 1);
  daysAfterCurrent = Array(7 - this.weekday)
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  currentMonth = this.monthNames[(new Date()).getMonth()];
  monthDisplayed = (new Date()).getMonth();
  yearDisplayed = (new Date()).getFullYear();
  eod = 0;

  //entry form
  concept = "";
  amount = "";

  daysInThisMonth() {
    var now = new Date();
    return (new Date(now.getFullYear(), now.getMonth() + 1, 0)).getDate();
  }

  weekdayOfFirstDay() {
    var now = new Date();
    return (new Date(now.getFullYear(), now.getMonth(), 1)).getDay();
  }

  daysInNextMonth() {
    var now = new Date();
    return (new Date(now.getFullYear(), now.getMonth() + 2, 0)).getDate();
  }

  setModalDate(day: number) {
    this.modalDate = new Date(this.yearDisplayed, this.monthDisplayed, day);
  }

  changeConcept(event: Event) {
    this.concept = (event.target as HTMLInputElement).value
  }

  changeAmount(event: Event) {
    this.amount = (event.target as HTMLInputElement).value
  }

  async addEntry(event: Event) {
    event.preventDefault();

    console.log(this.concept)

    var response = await fetch('/api/trip/create', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        concept: this.concept,
        amount: this.amount,
        date: this.modalDate
      })
    })

    let data = await response.json()

    if (!data.success)
      return this.error = data.error

    this.populateEntries()
  }

  async populateEntries() {
    var response = await fetch('/api/trip/all', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
      }
    })

    let data = await response.json()

    if (!data.success)
      return this.error = data.error

    this.entries = data.entries
  }

  getCookie(cname: string): string {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
