import {Component, OnInit} from '@angular/core';
// Person Class
import {Person} from '../../../models/person';
// service
import {PersonService} from '../../../services/person.service';

import {ToastrService} from 'ngx-toastr';
import {DebtService} from '../../../services/debt.service';
import {NgForm} from '@angular/forms';
import {Debt} from '../../../models/debt';

@Component({
    selector: 'app-person',
    templateUrl: './person.component.html',
    styles: []
})
export class PersonComponent implements OnInit {

    constructor(
        public personService: PersonService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        // me traerá las deudas dentro del servicio
        this.personService.getPeople();
        this.resetForm();
    }

    onSubmit(personForm: NgForm) {
        if (personForm.value.$key == null) {
            this.personService.insertPerson(personForm.value);
        } else {
            this.personService.updatePerson(personForm.value);
        }

        console.log('Selected Person:', this.personService.selectedPerson);
        console.log('debtForm value:', personForm.value);

        this.resetForm(personForm);
        this.toastr.success('Succesfull Operation', 'Succesfull Operation');
    }

    // resertForm() recibe el formulario, el ? es para decir que es opcional
    resetForm(personForm?: NgForm) {
        if (personForm != null) {
            personForm.reset();
            this.personService.selectedPerson = new Person();
        }
    }

}
