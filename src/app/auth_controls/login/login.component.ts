import { elementAt } from 'rxjs';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthApiService } from "../../services/auth-api.service";
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    CardModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    PasswordModule,
    DividerModule,
    ToastModule,

  ],
  templateUrl: './login.component.html',
  // standalone: true,
  providers: [MessageService, Router],
  styleUrl: './login.component.css',
  standalone: true
})
export default class LoginComponent {
  username: string | any;
  password: string | any;

  constructor(
    private authService: AuthApiService,
    private messageService: MessageService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (data) => {
        // console.log(data.info_session.name);

        localStorage.setItem('token', data.token);
        localStorage.setItem('userAuth', data.info_session.name)
        localStorage.setItem('role', data.info_session.rol);
        localStorage.setItem('username', data.info_session.username);

        // this.router.navigate(['inicio']).then(window.location.reload);
        window.location.href = '/inicio'
      },
      error: (error) => {
        console.log(error);
        this.messageService.add({ severity: 'warn', summary: 'Error', detail: `${error.error.error}`, life: 3000 });
      }
    });
  }

}
