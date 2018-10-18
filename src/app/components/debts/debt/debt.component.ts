import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
// Debt Class
import {Debt} from '../../../models/debt';
// service
import {DebtService} from '../../../services/debt.service';
import {PersonService} from '../../../services/person.service';

import {ToastrService} from 'ngx-toastr';


@Component({
    selector: 'app-debt',
    templateUrl: './debt.component.html',
    styleUrls: ['./debt.component.css']
})
export class DebtComponent implements OnInit {

    constructor(
        public debtService: DebtService,
        private toastr: ToastrService,
        public personService: PersonService
    ) {}

    ngOnInit() {
        // me traerá las deudas dentro del servicio
        this.debtService.getDebts();
        // this.personService.getPeople();
        this.resetForm();
    }

    onSubmit(debtForm: NgForm) {
        if (debtForm.value.$key == null) {
            this.debtService.insertDebt(debtForm.value);
            this.toastr.success('Debt inserted', 'Succesfull Operation');
            this.personService.insertPersonFromDebt(debtForm.value.name);
        } else {
            this.debtService.updateDebt(debtForm.value);
            this.toastr.success('Debt Updated', 'Succesfull Operation');
        }

        console.log('Selected Debt:', this.debtService.selectedDebt);
        console.log('debtForm value:', debtForm.value);

        this.resetForm(debtForm);
    }

    // resertForm() recibe el formulario, el ? es para decir que es opcional
    resetForm(debtForm?: NgForm) {
        if (debtForm != null) {
            console.log('el form no es null');
            this.debtService.selectedDebt = new Debt();
            debtForm.reset();
        }
    }

}
