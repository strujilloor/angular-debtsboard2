import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
// Debt Class
import {Debt} from '../../../models/debt';
// service
import {DebtService} from '../../../services/debt.service';

import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-debt',
    templateUrl: './debt.component.html',
    styleUrls: ['./debt.component.css']
})
export class DebtComponent implements OnInit {

    constructor(
        public debtService: DebtService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        // me traerá las deudas dentro del servicio
        this.debtService.getDebts();
        this.resetForm();
    }

    onSubmit(debtForm: NgForm) {
        if (debtForm.value.$key == null) {
            this.debtService.insertDebt(debtForm.value);
        } else {
            this.debtService.updateDebt(debtForm.value);
        }

        console.log('Selected Debt:', this.debtService.selectedDebt);
        console.log('debtForm value:', debtForm.value);

        this.resetForm(debtForm);
        this.toastr.success('Succesfull Operation', 'Succesfull Operation');
    }

    // resertForm() recibe el formulario, el ? es para decir que es opcional
    resetForm(debtForm?: NgForm) {
        if (debtForm != null) {
            debtForm.reset();
            this.debtService.selectedDebt = new Debt();
        }
    }

}
