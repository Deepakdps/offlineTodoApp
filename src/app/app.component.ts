import { Component } from '@angular/core';
import { DatabaseService } from './database/database.service';

@Component({
    selector: 'ns-app',
    moduleId: module.id,
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(private database: DatabaseService) {
        this.database.getdbConnection().then(db => {
            db.execSQL(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, item_name TEXT, user_id TEXT)'
            ).then(
                () => {},
                error => {
                    console.log('CREATE TABLE ERROR', error);
                }
            );
            db.execSQL(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT UNIQUE, password TEXT)'
            ).then(
                () => {},
                error => {
                    console.log('CREATE TABLE ERROR', error);
                }
            );
        });
    }
}
