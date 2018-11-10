import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot
} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('x-auth')) {
      return true;
    }
    alert('You need to login first.');
    this.router.navigate(['/login']);
    return false;
  }
}
