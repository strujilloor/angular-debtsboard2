import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// components
import { AppComponent } from './app.component';
import { DebtsComponent } from './components/debts/debts.component';
import { DebtListComponent } from './components/debts/debt-list/debt-list.component';
import { DebtComponent } from './components/debts/debt/debt.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonComponent } from './components/people/person/person.component';
import { PersonListComponent } from './components/people/person-list/person-list.component';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

// services
import {DebtService} from './services/debt.service';
import {PersonService} from './services/person.service';

import {FormsModule} from '@angular/forms';

// router
import { RouterModule, Routes } from '@angular/router';


const appRoutes: Routes = [
    {path: '', redirectTo: '/debts', pathMatch: 'full'},
    {path: 'debts', component: DebtsComponent},
    {path: 'people', component: PeopleComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    DebtsComponent,
    DebtListComponent,
    DebtComponent,
    PeopleComponent,
    PersonComponent,
    PersonListComponent
  ],
  imports: [
    BrowserModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      FormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      RouterModule.forRoot(appRoutes)
  ],
  providers: [DebtService, PersonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
