import { Injectable } from '@angular/core';

import { User } from '../models/user.model';
import { BackendService } from './backend.service';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class LoginService {
    constructor(private database: DatabaseService) {}

    register(user: User) {
        return new Promise<Object>((resolve, reject) => {
            this.database.getdbConnection().then(db => {
                db.execSQL(
                    'INSERT INTO users (user_id,password) VALUES (?,?)',
                    [user.email, user.password]
                ).then(
                    id => {
                        resolve({ status: true });
                    },
                    err => {
                        reject({ status: false });
                    }
                );
            });
        });
    }

    login(user: User) {
        return new Promise<Object>((resolve, reject) => {
            this.database.getdbConnection().then(db => {
                db.all(
                    "SELECT * FROM users where user_id like'" +
                        user.email +
                        "' and password like '" +
                        user.password +
                        "'"
                ).then(rows => {
                    if (rows.length > 0) {
                        BackendService.token = 'dummy_token';
                        resolve({ status: true });
                    } else {
                        reject({ status: false });
                    }
                });
            });
        });
    }

    logout() {
        BackendService.token = '';
        this.database.closedbConnection();
    }
}
