import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
// Debt Class
import {Debt} from '../../../models/debt';
// service
import {DebtService} from '../../../services/debt.service';


@Component({
    selector: 'app-debt',
    templateUrl: './debt.component.html',
    styleUrls: ['./debt.component.css']
})
export class DebtComponent implements OnInit {

    constructor(public debtService: DebtService) {
    }

    ngOnInit() {
        // me traerá las deudas dentro del servicio
        this.debtService.getDebts();
        this.resetForm();
    }

    onSubmit(debtForm: NgForm) {
        console.log('Selected Debt:', this.debtService.selectedDebt);
        console.log('debtForm value:', debtForm.value);
        this.debtService.insertDebt(debtForm.value);
        this.resetForm(debtForm);
    }

    // resertForm() recibe el formulario, el ? es para decir que es opcional
    resetForm(debtForm?: NgForm) {
        if (debtForm != null) {
            debtForm.reset();
            this.debtService.selectedDebt = new Debt();
        }
    }

}
