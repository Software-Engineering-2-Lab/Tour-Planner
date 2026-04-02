import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, MatIconModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    isLoginMode = true;
    isLoading = false;
    loginSubmitFailed = false;
    registerSubmitFailed = false;
    serverErrorMessage = '';
    showForgotPassword = false;

    showLoginPassword = false;
    showRegisterPassword = false;
    showRegisterConfirmPassword = false;

    private authService = inject(AuthService);
    private router = inject(Router);

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });

    registerForm = new FormGroup({
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
        confirmPassword: new FormControl('', [Validators.required])
    }, { validators: this.passwordMatchValidator });

    passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { passwordMismatch: true };
    }

    switchMode(mode: 'login' | 'register') {
        this.isLoginMode = mode === 'login';
        this.loginSubmitFailed = false;
        this.registerSubmitFailed = false;
        this.serverErrorMessage = '';
        this.showForgotPassword = false;
        this.loginForm.reset();
        this.registerForm.reset();
    }

    togglePasswordVisibility(field: string) {
        if (this.isLoading) return;
        if (field === 'login') this.showLoginPassword = !this.showLoginPassword;
        else if (field === 'register') this.showRegisterPassword = !this.showRegisterPassword;
        else if (field === 'confirm') this.showRegisterConfirmPassword = !this.showRegisterConfirmPassword;
    }

    onSubmit() {
        if (this.isLoading) return;
        this.loginSubmitFailed = false;
        this.serverErrorMessage = '';
        this.showForgotPassword = false;

        if (this.loginForm.invalid) {
            this.loginSubmitFailed = true;
            return;
        }

        this.isLoading = true;
        this.authService.login(this.loginForm.value).subscribe({
            next: (response) => {
                this.isLoading = false;
                if (response?.token) this.authService.saveToken(response.token);
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.isLoading = false;
                this.loginSubmitFailed = true;
                this.serverErrorMessage = error.error?.message || 'Email or password are invalid';
                if (this.serverErrorMessage.toLowerCase().includes('password')) {
                    this.showForgotPassword = true;
                }
            }
        });
    }

    onRegisterSubmit() {
        if (this.isLoading) return;
        this.registerSubmitFailed = false;
        this.serverErrorMessage = '';

        if (this.registerForm.invalid) {
            this.registerSubmitFailed = true;
            return;
        }

        this.isLoading = true;
        this.authService.register(this.registerForm.value).subscribe({
            next: () => {
                this.isLoading = false;
                this.registerForm.reset();
                this.switchMode('login');
            },
            error: (error) => {
                this.isLoading = false;
                this.registerSubmitFailed = true;
                this.serverErrorMessage = error.error?.message || 'Registration failed';
            }
        });
    }
}