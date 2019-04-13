import { Injectable } from '@angular/core';
var Sqlite = require('nativescript-sqlite');

@Injectable()
export class DatabaseService {
    public getdbConnection() {
        return new Sqlite('todos');
    }

    public closedbConnection() {
        new Sqlite('todos').then(db => {
            db.close();
        });
    }
}
