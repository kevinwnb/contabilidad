import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  error = ""
  registerUserFormError = ''
  changeUserPasswordFormError = ''

  users: any[] = []

  roles = ['Sin identificación', 'Gerente', 'Administrador', 'Empleado']
  designations = ['Sin designación', 'Cafetería Kevin', 'Cafetería Miranda', 'Pastelería Miranda Mezquita', 'Pastelería Miranda Carlos III', 'Gerencia']
  name = ''
  lastName = ''
  email = ''
  password = ''
  role = 3
  selectedDesignation = 0

  formsAvailable = ['none', 'Añadir usuario', 'Cambio de contraseña', 'Eliminar usuario']
  formToShow = 0

  changePasswordForm = {
    user_id: 0,
    password: '',
    changePassword: (event: Event) => {
      this.changePasswordForm.password = (event.target as HTMLInputElement).value
    },
    setUserId: (userId: number) => {
      this.changePasswordForm.user_id = userId
    }
  }

  userIdForDeletion = 0

  userPrivilegesForm = {
    user_id: 0,
    privileges: {
      manage_users: 0,
      see_income_details: 0
    },
    setUserId: (userId: number) => {
      this.userPrivilegesForm.user_id = userId
    },
    setPrivileges: async (event: Event) => {
      //
    }
  }

  constructor(private el: ElementRef) {
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

  async addUser() {

    let response = await fetch('/api/add-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getCookie('token')
      },
      body: JSON.stringify({
        first_name: this.name,
        last_name: this.lastName,
        email: this.email,
        password: this.password,
        role_id: this.role,
        designation_id: this.selectedDesignation
      })
    })

    let data = await response.json()

    if (!data.success)
      return this.registerUserFormError = data.error

    this.el.nativeElement.querySelector('#modal button.btn-close').click()
    this.name = ''
    this.lastName = ''
    this.email = ''
    this.password = ''
    this.role = 3
    this.selectedDesignation = 0

    this.populateTableWithAllUsers()
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
        user_id: this.changePasswordForm.user_id,
        password: this.changePasswordForm.password
      })
    })

    let data = await response.json()

    if (!data.success)
      return this.changeUserPasswordFormError = data.error

    this.el.nativeElement.querySelector('#modal button.btn-close').click()
  }

  async deleteUser(userId: number) {
    let response = await fetch('/api/delete-user', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.getCookie('token')
      },
      body: JSON.stringify({
        user_id: userId
      })
    })

    let data = await response.json()

    if (!data.success)
      return this.error = data.error

    this.el.nativeElement.querySelector('#modal button.btn-close').click()

    this.formToShow = 0

    this.populateTableWithAllUsers()
  }

  changeFormToShow(formToShow: number) {
    this.formToShow = formToShow
  }

  getFormToShow() {
    return this.formsAvailable[this.formToShow]
  }

  changeUserIdForDeletion(userId: number) {
    this.userIdForDeletion = userId
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
