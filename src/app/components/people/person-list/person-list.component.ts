import {Component, OnInit} from '@angular/core';
// service
import {PersonService} from '../../../services/person.service';
// class Person
import {Person} from '../../../models/person';

import {ToastrService} from 'ngx-toastr';
import {Debt} from '../../../models/debt';
import {DebtService} from '../../../services/debt.service';

@Component({
    selector: 'app-person-list',
    templateUrl: './person-list.component.html',
    styles: []
})
export class PersonListComponent implements OnInit {
    personList: Person[];

    constructor(
        private personService: PersonService,
        private toastr: ToastrService,
    ) {}

    ngOnInit() {
        // snapshotChanges me va a traer todos los cambios que ocurran en la DB
        // subscribe nos trae los propios items, que estamos oyendo en la DB
        this.personService.getPeople()
            .snapshotChanges()
            .subscribe(item => {
                this.personList = [];
                item.forEach(element => {
                    let x = element.payload.toJSON();
                    x['$key'] = element.key;
                    this.personList.push(x as Person);
                });
            });
    }

    onEdit(person: Person) {
        /* al asignar el respectivo debt a debtService automaticamente se rellena el form
        debido a que el form esta utilizando debtService para llenar sus campos */
        this.personService.selectedPerson = Object.assign({}, person);
        /* el Object assign es para evitar el doble enlace de datos (problemas en apps grandes)*/
    }

    onDelete($key: string) {
        if (confirm('Are you sure you want to delete it?')) {
            this.personService.deletePerson($key);
            this.toastr.warning('Successfull Operation', 'Person Deleted');
        }
    }

}
