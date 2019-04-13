import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../models/user.model';
import { RouterExtensions } from 'nativescript-angular/router';
import { setString } from 'tns-core-modules/application-settings';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    moduleId: module.id
})
export class LoginComponent implements OnInit {
    user: User;
    @ViewChild('email') name1InputRef: ElementRef;
    @ViewChild('password') name2InputRef: ElementRef;
    constructor(
        private loginService: LoginService,
        private route: RouterExtensions
    ) {
        this.user = new User();
    }

    ngOnInit() {}
    public login() {
        this.user.email = this.name1InputRef.nativeElement.text;
        this.user.password = this.name2InputRef.nativeElement.text;
        this.loginService.login(this.user).then(
            status => {
                setString('user_id', this.user.email);
                alert(JSON.stringify(status));
                this.route.navigate(['/todos'], { clearHistory: true });
            },
            err => {
                alert('Unfortunately we could not find your account.');
                this.route.navigate(['/register']);
            }
        );
    }
}
