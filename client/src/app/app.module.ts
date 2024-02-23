import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './shared/components/nav/nav.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FinancesComponent } from './charts/finances/finances.component';
import { MileageComponent } from './charts/mileage/mileage.component';
import { EfficiencyComponent } from './charts/efficiency/efficiency.component';
import { CostPerMileComponent } from './charts/cost-per-mile/cost-per-mile.component';
import { RefuelComponent } from './refuel/refuel.component';
import { BillsComponent } from './bills/bills.component';
import { TripsComponent } from './trips/trips.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    NavComponent,
    FinancesComponent,
    MileageComponent,
    EfficiencyComponent,
    CostPerMileComponent,
    RefuelComponent,
    BillsComponent,
    TripsComponent,
    CreateAccountComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
