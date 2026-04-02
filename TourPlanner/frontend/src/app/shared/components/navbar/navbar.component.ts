import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}