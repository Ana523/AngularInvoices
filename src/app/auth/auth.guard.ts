import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(private router: Router) {}
    
    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {       
        // Store token and token expiration time in variables
        const token = localStorage.getItem('token');
        const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');

        // Check if there is a token and if it is valid
        if (token != null && Date.parse(tokenExpirationTime) > Date.now()) {
            return true;
        } else {
            this.router.navigate(['/auth/signin']);
            return false;
        }; 
    }
}