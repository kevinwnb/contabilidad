import { Component } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  userModel: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  success: boolean = false
  error: string = ''

  async onSubmit(event: Event) {
    event.preventDefault()

    let response = await fetch('/api/create-account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.userModel)
    })

    let data = await response.json()

    if (data.success) {
      this.success = true
      return
    }

    if (data.error) {
      this.success = false
      this.error = data.error
      return
    }
  }
}
