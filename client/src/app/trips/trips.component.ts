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
  daysBeforeCurrent = Array.from({ length: (this.weekday || 7) - 1 }, (_, i) => i + 1);
  //Array(7 - (this.weekday || 1) - this.getDaysToSubtract() + this.getDaysToAdd())
  daysAfterCurrent = Array(this.days.length + this.daysBeforeCurrent.length < 36 ? 35 - this.days.length - this.daysBeforeCurrent.length : 42 - this.days.length - this.daysBeforeCurrent.length);
  monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  monthAndYearToDisplay = (new Date()).getFullYear() + '-' + this.getCurrentMonthInNumber();
  changeMonthAndYearToDisplay(event: Event) {
    this.monthAndYearToDisplay = (event.target as HTMLInputElement).value
    this.monthDisplayed = (new Date((event.target as HTMLInputElement).value)).getMonth() + 1
    this.yearDisplayed = (new Date((event.target as HTMLInputElement).value)).getFullYear()
    let dat = (new Date((event.target as HTMLInputElement).value))
    this.weekday = new Date(dat.getFullYear(), dat.getMonth(), 1).getDay();
    this.changeDays()
    this.changeDaysBeforeCurrent()
    this.changeDaysAfterCurrent()
    //alert(this.weekday)
    this.populateEntries();
  }
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

  entryDeletionError: string;

  constructor() {
    this.populateEntries();
  }

  changeDays() {
    this.days = Array.from({ length: this.daysInMonthToDisplay() }, (_, i) => i + 1)
  }

  changeDaysBeforeCurrent() {
    this.daysBeforeCurrent = Array.from({ length: this.weekday - 1 }, (_, i) => i + 1);
  }

  getDaysToSubtract() {
    return this.days.length == 30 ? 1 : this.days.length == 31 ? 2 : 0
  }

  getDaysToAdd() {
    return this.days.length == 28 ? 1 : 0
  }

  changeDaysAfterCurrent() {
    this.daysAfterCurrent = Array(this.days.length + this.daysBeforeCurrent.length < 36 ? 35 - this.days.length - this.daysBeforeCurrent.length : 42 - this.days.length - this.daysBeforeCurrent.length)
  }

  changeSelectedDesignation(event: Event) {
    this.selectedDesignation = this.designations.indexOf(this.designations[parseInt((event.target as HTMLInputElement).value)])
    this.concept = "Cierre " + this.designations[this.selectedDesignation]
  }

  daysInThisMonth() {
    var now = new Date();
    return (new Date(now.getFullYear(), now.getMonth() + 1, 0)).getDate();
  }

  daysInMonthToDisplay() {
    return (new Date(this.yearDisplayed, this.monthDisplayed, 0)).getDate();
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
        opening: this.intercambiarPuntoComa(this.opening),
        closing: this.intercambiarPuntoComa(this.closing),
        mastercard: this.intercambiarPuntoComa(this.mastercard),
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
      {
        let sum = parseFloat(entry.cierre_contado) - parseFloat(entry.apertura_contado) + parseFloat(entry.tarjeta)
        return Math.round((sum + Number.EPSILON) * 100) / 100
      }
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

  calculateTotalMastercard(designationFilter: number) {
    let entries = this.entries.filter(entry => entry.designation_id == designationFilter || designationFilter == -1);
    let total = 0;
    entries.forEach(entry => {
      total += entry.tarjeta;
    })

    return total;
  }

  calculateTotalCash(designationFilter: number) {
    let entries = this.entries.filter(entry => entry.designation_id == designationFilter || designationFilter == -1);
    let total = 0;
    entries.forEach(entry => {
      total += entry.cierre_contado - entry.apertura_contado;
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

  intercambiarPuntoComa(input: any) {
    return input.replace(/[,.]/g, function (x: any) { return x == "," ? "." : ""; });
  }

  validateCurrencyFormat(input: string) {
    let regex = /^\d\.\d\d\d,\d\d$|^\d\d\d,\d\d$|^\d\d,\d\d$|^\d,\d\d$|^\d\.\d\d\d$|^\d\d\d$|^\d\d$|^\d$/i;
    return regex.test(input);
  }

  filterByDesignation(designation: number) {
    this.designationFilter = designation;
  }

  getCurrentMonthInNumber() {
    return ("0" + ((new Date()).getMonth() + 1)).slice(-2)
  }

  getMonthIn2DigitFormat(month: number) {
    return ("0" + month).slice(-2)
  }

  toFixed2Digits(number: number) {
    return Math.round((number + Number.EPSILON) * 100) / 100
  }

  async confirmDeletion(id: number) {
    if(confirm("¿Confirmar la eliminación?") === true) {
      let response = await fetch('/api/entry/' + id, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + this.getCookie('token')
        }
      })

      let data = await response.json()

      if (!data.success)
        return this.entryDeletionError = data.error

      this.populateEntries()
    }
  }

  clearErrors() {
    this.error = '';
    this.entryDeletionError = '';
  }

  clearFields() {
    this.opening = '';
    this.closing = '';
    this.mastercard = '';
    this.modalDate = new Date();
    this.selectedDesignation = 0;
    this.concept = 'Cierre ' + this.designations[this.selectedDesignation];
  }

  roundTo2Decimals(number: number) {
    return Math.round((number + Number.EPSILON) * 100) / 100
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
