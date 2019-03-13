import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    emailFilter: RegExp = /\S+@\S+\.\S+/;
    user: User;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private userService: UserService) {}

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]]
        });

        this.authService.logout();

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get controls() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authService.login(this.controls.email.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.userService.getUserInfo(data.id).subscribe(user => this.user = user);
                  this.router.navigate([this.returnUrl]);
                  this.loading = false;
                },
                () => {
                    this.loading = false;
                });
    }
}