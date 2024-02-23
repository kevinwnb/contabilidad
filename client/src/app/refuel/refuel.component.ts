import { Component } from '@angular/core';

@Component({
  selector: 'app-refuel',
  templateUrl: './refuel.component.html',
  styleUrls: ['./refuel.component.scss']
})
export class RefuelComponent {
  trips: any[]
  refuels: any[]
  error: string


  constructor() {
    this.getTrips()
  }

  async getRefuels(tripId: number) {
    var response = await fetch('/api/refuel/' + tripId + "/" + (new Date().getFullYear()), {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
        'Content-Type': 'x-www-form-urlencoded'
      }
    })
    var data = await response.json()
    if (!data.success)
      return this.error = "Ha ocurrido un error"

    return this.refuels = data.refuels.map((r: any) => {
      return {
        id: r.id,
        tripId: r.trip_id,
        price: r.price_paid,
        date: (new Date(r.date)).toLocaleDateString()
      }
    })
  }

  async getTrips() {
    var response = await fetch('/api/trip/all', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token'),
        'Content-Type': 'application/json'
      }
    })
    var data = await response.json()
    if (!data.success)
      return this.error = "Ha ocurrido un error"

    return this.trips = data.trips.sort((a: any, b: any) => {
      return (new Date(a.start_date)).getTime() - (new Date(b.start_date)).getTime()
    }).map((t: any) => {
      return {
        id: t.id,
        startLocation: t.start_location,
        endLocation: t.end_location,
        startDate: (new Date(t.start_date)).toLocaleDateString(),
        endDate: (new Date(t.end_date)).toLocaleDateString(),
        miles: t.miles
      }
    })
  }

  getCookie(n: string) {
    let name = n + "=";
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
}
