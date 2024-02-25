import { Component, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
  error: string;
  entries: any[] = [];

  roles = ['Sin identificación', 'CEO', 'Administrador', 'Empleado']
  role = parseInt(this.getCookie('role_id')) || 0;

  designations = ['Sin designación', 'Cafetería Kevin', 'Cafetería Miranda', 'Pastelería Miranda Mezquita', 'Pastelería Miranda Carlos III', 'Gerencia'];
  designation = parseInt(this.getCookie('designation_id')) || 0;

  modalDate: Date = new Date();
  days = Array.from({ length: this.daysInThisMonth() }, (_, i) => i + 1);
  weekday = this.weekdayOfFirstDay();
  daysBeforeCurrent = Array.from({ length: this.weekday - 1 }, (_, i) => i + 1);
  daysAfterCurrent = Array(7 - this.weekday)
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  currentMonth = this.monthNames[(new Date()).getMonth()];
  monthDisplayed = (new Date()).getMonth() + 1;
  yearDisplayed = (new Date()).getFullYear();
  eod = 0;

  //entry form
  concept = "";
  amount = "";

  categories = [
    "Sin categoría",
    "Cafetería Kevin",
    "Cafetería Miranda",
    "Pastelería Miranda Mezquita",
    "Pastelería Miranda Carlos III",
  ];

  category = 0;

  constructor() {
    this.populateEntries();
  }

  changeCategory(event: Event) {
    this.category = this.categories.indexOf(this.categories[parseInt((event.target as HTMLInputElement).value)])
  }

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
    var date = new Date(this.yearDisplayed, this.monthDisplayed - 1, day)
    var userTimezoneOffset = date.getTimezoneOffset() * 60000;
    this.modalDate = new Date(date.getTime() - userTimezoneOffset);
  }

  changeConcept(event: Event) {
    this.concept = (event.target as HTMLInputElement).value;
  }

  changeAmount(event: Event) {
    this.amount = (event.target as HTMLInputElement).value;
  }

  async addEntry(event: Event) {
    event.preventDefault();

    var response = await fetch('/api/entry', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        concept: this.concept,
        amount: this.amount,
        date: this.modalDate.toISOString(),
        category: this.category
      })
    })

    let data = await response.json()

    if (!data.success)
      return this.error = data.error

    this.populateEntries()
  }

  async populateEntries() {
    var response = await fetch('/api/entry/' + this.monthDisplayed + '/' + this.yearDisplayed + '/all', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
      }
    })

    let data = await response.json()

    if (!data.success)
      return this.error = data.error

    this.entries = data.entries
    console.log(this.entries)
  }

  filterEntriesByDay(entries: any[], category: number) {
    let entriesByDay = entries.filter(entry => new Date(entry.fecha).getDate() == this.modalDate.getDate() && entry.idcategoria == category);
    return entriesByDay;
  }

  getEntriesCount(day: number) {
    return this.entries.filter(entry => new Date(entry.fecha).getDate() == day).length
  }

  getEntriesSum(day: number) {
    let entriesByDay = this.entries.filter(entry => new Date(entry.fecha).getDate() == day);
    let sum = 0;
    entriesByDay.forEach(entry => {
      sum += entry.cantidad;
    });

    return Math.round((sum + Number.EPSILON) * 100) / 100;
  }

  calculateTotal() {
    let total = 0;
    this.entries.forEach(entry => {
      total += entry.cantidad;
    })

    return total;
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
