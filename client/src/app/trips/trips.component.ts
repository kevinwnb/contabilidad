import { Component, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent {
  error: string;
  entries: any[] = [];

  roles = ['Sin identificación', 'Gerente', 'Administrador', 'Empleado']
  role = parseInt(this.getCookie('role_id')) || 0;

  designations = ['Sin designación', 'Cafetería Kevin', 'Cafetería Miranda', 'Pastelería Miranda Mezquita', 'Pastelería Miranda Carlos III', 'Gerencia'];
  designation = parseInt(this.getCookie('designation_id')) || 0;
  selectedDesignation = this.designation == 5 ? 0 : this.designation;

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
  concept = "Cierre " + this.designations[this.selectedDesignation];
  amount = "";
  opening = "";
  closing = "";
  mastercard = "";

  designationFilter = -1;

  constructor() {
    this.populateEntries();
  }

  changeSelectedDesignation(event: Event) {
    this.selectedDesignation = this.designations.indexOf(this.designations[parseInt((event.target as HTMLInputElement).value)])
    this.concept = "Cierre " + this.designations[this.selectedDesignation]
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

    this.error = '';

    if (!this.validateCurrencyFormat(this.opening) || !this.validateCurrencyFormat(this.closing) || !this.validateCurrencyFormat(this.mastercard))
      return this.error = "Por favor introduce las cantidades usando como referencia el formato X.XXX,XX"

    var response = await fetch('/api/entry', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        operator: this.getCookie('user_id'),
        concept: this.concept,
        opening: this.opening,
        closing: this.closing,
        mastercard: this.mastercard,
        date: this.modalDate.toISOString(),
        designation: this.selectedDesignation
      })
    })

    let data = await response.json()

    if (!data.success)
      return this.error = data.error

    this.populateEntries()
  }

  async populateEntries() {
    var response = await fetch('/api/entry' + (this.role == 3 ? '/employee/' : '/') + this.monthDisplayed + '/' + this.yearDisplayed + '/all', {
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

  filterEntriesByDay(entries: any[], designation: number) {
    let entriesByDay = entries.filter(entry => new Date(entry.fecha).getDate() == this.modalDate.getDate() && (entry.designation_id == designation || designation == 5));
    return entriesByDay;
  }

  getEntriesCount(day: number) {
    return this.entries.filter(entry => new Date(entry.fecha).getDate() == day).length
  }

  getEntriesSum(day: number) {
    let entriesByDay = this.entries.filter(entry => new Date(entry.fecha).getDate() == day);
    let sum = 0;
    entriesByDay.forEach(entry => {
      sum += parseFloat(entry.cierre_contado) - parseFloat(entry.apertura_contado) + parseFloat(entry.tarjeta);
    });

    return Math.round((sum + Number.EPSILON) * 100) / 100;
  }

  getEntrySum(day: number) {
    let entry = this.entries.find(entry => new Date(entry.fecha).getDate() == day && entry.designation_id == this.designationFilter);
    if (entry)
      return parseFloat(entry.cierre_contado) - parseFloat(entry.apertura_contado) + parseFloat(entry.tarjeta)
    else
      return 0
  }

  getEntryCheck(day: number) {
    let entriesByDay = this.entries.filter(entry => new Date(entry.fecha).getDate() == day);
    if (entriesByDay.length > 0)
      return true
    else
      return false
  }

  calculateTotal(designationFilter: number) {
    let entries = this.entries.filter(entry => entry.designation_id == designationFilter || designationFilter == -1);
    let total = 0;
    entries.forEach(entry => {
      total += entry.cierre_contado - entry.apertura_contado + entry.tarjeta;
    })

    return total;
  }

  calculateDifference(opening: number, closing: number, mastercard: number) {
    return closing - opening + mastercard;
  }

  changeOpening(event: Event) {
    this.opening = (event.target as HTMLInputElement).value;
  }

  changeClosing(event: Event) {
    this.closing = (event.target as HTMLInputElement).value;
  }

  changeMastercard(event: Event) {
    this.mastercard = (event.target as HTMLInputElement).value;
  }

  removeGerenteFromDesignations(designations: string[]) {
    return designations.filter((designation, i) => i != 5);
  }

  validateCurrencyFormat(input: string) {
    let regex = /^\d\.\d\d\d,\d\d$|^\d\d\d,\d\d$|^\d\d,\d\d$|^\d,\d\d$|^\d\.\d\d\d$|^\d\d\d$|^\d\d$|^\d$/i;
    return regex.test(input);
  }

  filterByDesignation(designation: number) {
    this.designationFilter = designation;
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
