import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  errorMsg: string = ''

  formerCredentials = {
    email: 'kevinwnb@gmail.com',
    password: 'Kevin1703'
  }
  loginForm = this.formBuilder.group({
    email: 'kevinwnb@gmail.com',
    password: 'Kevin1703'
  })

  isLoading = false

  constructor(private router: Router, private formBuilder: FormBuilder) {

  }

  setCookie(cname: string, cvalue: string, exdays: number) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  async onSubmit() {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.loginForm.value)
    })

    const data = await response.json()

    if (!data.success) {
      this.errorMsg = data.error
      this.isLoading = false
    }
    else if (data.success) {
      this.setCookie("token", data.token, 1)
      this.errorMsg = ""
      this.isLoading = false
      this.router.navigate(['trips'])
    }
  }
}
