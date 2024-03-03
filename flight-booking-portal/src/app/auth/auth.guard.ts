import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if (!this.authService.currentUser){ 
      this.router.navigate(['/register-passenger', { requestedUrl: state.url}]) 
    };
    
    return true;
  };
}
