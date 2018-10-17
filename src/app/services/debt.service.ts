import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Debt} from '../models/debt';

@Injectable({
    providedIn: 'root'
})
export class DebtService {

    debtList: AngularFireList<any>;
    selectedDebt: Debt = new Debt();

    constructor(private firebase: AngularFireDatabase) {
    }

    getDebts() {
        return this.debtList = this.firebase.list('debts');
    }

    insertDebt(debt: Debt) {
        const id = this.debtList.push({
            name: debt.name,
            amount: debt.amount,
            kind: debt.kind,
            details: debt.details
        }).key;
        console.log('id: ', id);
    }

    updateDebt(debt: Debt) {
        this.debtList.update(debt.$key, {
            name: debt.name,
            amount: debt.amount,
            kind: debt.kind,
            details: debt.details
        });
    }

    deleteDebt($key: string) {
        this.debtList.remove($key);
    }
}
