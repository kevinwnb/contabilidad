import { Component } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  error = ""
  registerUserFormError = ''

  users: any[] = []

  roles = ['Sin identificación', 'Gerente', 'Administrador', 'Empleado']
  designations = ['Sin designación', 'Cafetería Kevin', 'Cafetería Miranda', 'Pastelería Miranda Mezquita', 'Pastelería Miranda Carlos III', 'Gerencia']
  name = ''
  lastName = ''
  email = ''
  password = ''
  role = 3
  selectedDesignation = 0

  changePasswordForm = {
    user_id: 0,
    password: '',
    setUserId: (event: Event) => {
      this.changePasswordForm.user_id = parseInt((event.target as HTMLInputElement).value)
    }
  }

  constructor() {
    this.populateTableWithAllUsers()
  }

  async populateTableWithAllUsers() {
    let response = await fetch('/api/get-all-users', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + this.getCookie('token')
      }
    })

    let data = await response.json()

    if (!data.success)
      return this.registerUserFormError = data.error

    this.users = data.users
  }

  changeName(event: Event) {
    this.name = (event.target as HTMLInputElement).value
  }

  changeLastName(event: Event) {
    this.lastName = (event.target as HTMLInputElement).value
  }

  changeEmail(event: Event) {
    this.email = (event.target as HTMLInputElement).value
  }

  changePassword(event: Event) {
    this.password = (event.target as HTMLInputElement).value
  }

  changeRole(event: Event) {
    this.role = parseInt((event.target as HTMLInputElement).value)
  }

  addUser() {
    console.log(this.name, this.lastName, this.email, this.password, this.role)
  }

  changeSelectedDesignation(event: Event) {
    this.selectedDesignation = this.designations.indexOf(this.designations[parseInt((event.target as HTMLInputElement).value)])
  }

  removeFirstOptionFromRolesArray(roles: string[]) {
    return roles.slice(1);
  }

  getRole(role: number) {
    return this.roles[role]
  }

  getDesignation(designation: number) {
    return this.designations[designation]
  }

  async changeUserPassword(userId: number) {

    let response = await fetch('/api/change-user-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getCookie('token')
      },
      body: JSON.stringify({
        user_id: userId,
        password: this.password
      })
    })

    let data = await response.json()

    if (!data.success)
      return this.error = data.error

    this.error = ''
  }

  getCookie(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return "";
  }
}
