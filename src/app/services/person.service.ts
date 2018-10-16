import {Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Person} from '../models/person';

@Injectable({
    providedIn: 'root'
})
export class PersonService {

    personList: AngularFireList<any>;
    selectedPerson: Person = new Person();

    constructor(private firebase: AngularFireDatabase) {
    }

    getPeople() {
        return this.personList = this.firebase.list('people');
    }

    insertPerson(person: Person) {
        this.personList.push({
            name: person.name
        });
    }

    updatePerson(person: Person) {
        this.personList.update(person.$key, {
            name: person.name
        });
    }

    deletePerson($key: string) {
        this.personList.remove($key);
    }

}
