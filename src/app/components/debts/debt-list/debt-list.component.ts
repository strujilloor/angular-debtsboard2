import {Component, OnInit} from '@angular/core';
// service
import {DebtService} from '../../../services/debt.service';
// class Debt
import {Debt} from '../../../models/debt';
import {element} from 'protractor';

@Component({
    selector: 'app-debt-list',
    templateUrl: './debt-list.component.html',
    styleUrls: ['./debt-list.component.css']
})
export class DebtListComponent implements OnInit {
    debtList: Debt[];

    constructor(
        private debtService: DebtService
    ) {
    }

    ngOnInit() {
        // snapshotChanges me va a traer todos los cambios que ocurran en la DB
        // subscribe nos trae los propios items, que estamos oyendo en la DB
        this.debtService.getDebts()
            .snapshotChanges()
            .subscribe(item => {
                this.debtList = [];
               item.forEach(element => {
                   let x = element.payload.toJSON();
                   x["$key"] = element.key;
                   this.debtList.push(x as Debt);
               });
            });
    }

    onEdit(debt: Debt) {
        /* al asignar el respectivo debt a debtService automaticamente se rellena el form
        debido a que el form esta utilizando debtService para llenar sus campos */
        this.debtService.selectedDebt = Object.assign({}, debt);
        /* el Object assign es para evitar el doble enlace de datos (problemas en apps grandes)*/
    }

    onDelete($key: string) {
        this.debtService.deleteDebt($key);
    }

}
