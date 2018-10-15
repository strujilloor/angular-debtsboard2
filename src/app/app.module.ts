import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// components
import { AppComponent } from './app.component';
import { DebtsComponent } from './components/debts/debts.component';
import { DebtListComponent } from './components/debts/debt-list/debt-list.component';
import { DebtComponent } from './components/debts/debt/debt.component';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

// services
import {DebtService} from './services/debt.service';

import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DebtsComponent,
    DebtListComponent,
    DebtComponent
  ],
  imports: [
    BrowserModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      FormsModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot()
  ],
  providers: [DebtService],
  bootstrap: [AppComponent]
})
export class AppModule { }
