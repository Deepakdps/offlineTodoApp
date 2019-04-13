import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { User } from '../models/user.model';
import { LoginService } from '../services/login.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'ns-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    moduleId: module.id
})
export class RegisterComponent implements OnInit {
    user: User;
    @ViewChild('email') name1InputRef: ElementRef;
    @ViewChild('password') name2InputRef: ElementRef;
    constructor(
        private location: Location,
        private loginService: LoginService,
        private router: RouterExtensions
    ) {
        this.user = new User();
        this.user.email = '';
        this.user.password = '';
    }

    ngOnInit() {}

    public register() {
        this.user.email = this.name1InputRef.nativeElement.text;
        this.user.password = this.name2InputRef.nativeElement.text;

        this.loginService.register(this.user).then(
            status => {
                alert('Your account was successfully created.');
                this.router.navigate(['/login']);
            },
            err => {
                alert('Unfortunately we were unable to create your account.');
            }
        );
    }
    public goBack() {
        this.location.back();
    }
}
