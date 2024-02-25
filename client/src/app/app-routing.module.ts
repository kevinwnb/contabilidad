import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RefuelComponent } from './refuel/refuel.component';
import { BillsComponent } from './bills/bills.component';
import { TripsComponent } from './trips/trips.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: "", redirectTo: "trips", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "create-account", component: CreateAccountComponent },
  { path: "home", component: HomeComponent, canActivate: [authGuard] },
  { path: "trips", component: TripsComponent, canActivate: [authGuard] },
  { path: "refuel", component: RefuelComponent, canActivate: [authGuard] },
  { path: "bills", component: BillsComponent, canActivate: [authGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
