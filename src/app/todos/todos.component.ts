import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { getString } from 'tns-core-modules/application-settings';
import { DatabaseService } from '../database/database.service';
import { LoginService } from '../services/login.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { ListViewEventData } from 'nativescript-ui-listview';

@Component({
    selector: 'ns-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css'],
    moduleId: module.id
})
export class TodosComponent implements OnInit {
    db: any;
    todos: string;
    user_id: string;
    todosList: Array<Object> = [];
    @ViewChild('todos') nameInputRef: ElementRef;
    constructor(
        private loginService: LoginService,
        private database: DatabaseService,
        private router: RouterExtensions
    ) {
        this.user_id = getString('user_id');
        console.log('user_id->', this.user_id);
    }

    ngOnInit() {
        this.selectItems();
    }
    selectItems() {
        this.todosList = [];
        this.database.getdbConnection().then(db => {
            db.all('SELECT id, item_name FROM items WHERE user_id = ?', [
                this.user_id
            ]).then(
                rows => {
                    for (let row in rows) {
                        this.todosList.push({
                            id: rows[row][0],
                            name: rows[row][1]
                        });
                    }
                    this.db = db;
                    // console.log('todosList', this.todosList);
                },
                error => {
                    console.log('SELECT ERROR', error);
                }
            );
        });
    }
    add() {
        this.todos = this.nameInputRef.nativeElement.text;
        if (this.todos.trim() === '') {
            alert('Enter a todos item');
            return;
        }
        this.db
            .execSQL('INSERT INTO items (item_name, user_id) VALUES (?,?)', [
                this.todos,
                this.user_id
            ])
            .then(
                id => {
                    this.todosList.unshift({ id: id, name: this.todos });
                    // console.log('todosList', this.todosList);
                    this.todos = '';
                },
                error => {
                    alert(
                        'An error occurred while adding an item to your list.'
                    );
                    this.todos = '';
                }
            );
    }
    logout() {
        this.loginService.logout();
        this.router.navigate(['/login'], { clearHistory: true });
    }
    delete(args: ListViewEventData) {
        let grocery = <any>args.object.bindingContext;

        this.db
            .execSQL('DELETE FROM items WHERE id=?', [grocery.id])
            .then(() => {
                let index = this.todosList.indexOf(grocery);
                this.todosList.splice(index, 1);
            });
    }
}
