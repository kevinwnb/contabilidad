import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss']
})
export class TripsComponent implements AfterViewInit {
  isAvailable: boolean = true;
  displayString: string = "";
  isLoading: boolean = true

  todaysDate: Date = new Date();
  endDate: Date = new Date();

  tripModel: { id: number, startLocation: string, endLocation: string, startDate: Date, endDate: Date, miles: number } = {
    id: 0,
    startLocation: "",
    endLocation: "",
    startDate: new Date(),
    endDate: this.endDate,
    miles: 0,
  }

  trips: { id: number, startLocation: string, endLocation: string, startDate: Date, endDate: Date, miles: number }[] = []

  error: string = ""

  constructor() {
    this.endDate.setDate(this.todaysDate.getDate() + 1);
    this.populateTrips()
  }

  @ViewChild('closeButton') closeButton: ElementRef
  @ViewChild('modal') modal: ElementRef

  async populateTrips() {
    var response = await fetch('/api/trip/all', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
        'Content-Type': 'application/json'
      }
    })

    var data = await response.json()

    console.log(data)

    this.trips = data.trips.map((t: any) => ({ id: t.id, startDate: new Date(t['start_date']), endDate: new Date(t['end_date']), startLocation: t['start_location'], endLocation: t['end_location'], miles: t.miles })).sort((a: any, b: any) => (a.startDate > b.startDate) ? 1 : -1)

    this.isLoading = false
  }

  getCookie(cname: string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  onSubmit(event: Event) {
    event.preventDefault()
    if (this.tripModel.id == 0)
      this.onAddTrip(event)
    if (this.tripModel.id > 0)
      this.onEditTrip(event)
  }

  onAddTripBtnClick(event: Event) {
    this.resetModal()
  }

  ngAfterViewInit() {
    this.modal.nativeElement.addEventListener('shown.bs.modal', () => {
      this.modal.nativeElement.querySelector('.modal #startLocation').focus()
    })

    this.modal.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.resetModal()
    })
  }

  resetModal() {
    this.tripModel = {
      id: 0,
      startLocation: "",
      endLocation: "",
      startDate: new Date(),
      endDate: this.endDate,
      miles: 0
    }

    this.error = ""
  }

  async onAddTrip(event: Event) {
    event.preventDefault()

    let response = await fetch('/api/trip/create', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.tripModel)
    })
    let data = await response.json()

    if (!data.success)
      return this.error = data.error

    if (data.success) {
      this.populateTrips()
      this.closeButton.nativeElement.click()
    }
  }

  onEditBtnClick(event: Event, trip: { id: number, startLocation: string, endLocation: string, startDate: Date, endDate: Date, miles: number }) {
    this.tripModel = trip
  }

  async onEditTrip(event: Event) {
    event.preventDefault()

    let response = await fetch('/api/trip/update', {
      method: 'PUT',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.tripModel)
    })
    let data = await response.json()
    if (!data.success)
      return this.error = data.error

    this.populateTrips()
    this.closeButton.nativeElement.click()
  }

  async onDelete(event:Event, tripId: number) {
    event.preventDefault()

    var response = await fetch('/api/trip/delete/' + tripId, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
        'Content-Type': 'application/json'
      }
    })

    var data = await response.json()

    if (!data.success)
      return this.error = data.error

    this.populateTrips()
  }
}
