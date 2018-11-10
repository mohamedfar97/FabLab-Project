import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot
} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";

@Injectable()
export class NonLoggedInGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('x-auth')) {
      let id = this.authService.getUserFromToken(sessionStorage.getItem("x-auth"))._id;
      this.router.navigate(['/profile'],
        { queryParams: {
          id
        }
      });
      return false;
    }
    return true;

  }
}
