import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPwdPattern, PwdPattern } from 'app/shared/model/pwd-pattern.model';
import { PwdPatternService } from './pwd-pattern.service';
import { PwdPatternComponent } from './pwd-pattern.component';
import { PwdPatternDetailComponent } from './pwd-pattern-detail.component';
import { PwdPatternUpdateComponent } from './pwd-pattern-update.component';

@Injectable({ providedIn: 'root' })
export class PwdPatternResolve implements Resolve<IPwdPattern> {
  constructor(private service: PwdPatternService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPwdPattern> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pwdPattern: HttpResponse<PwdPattern>) => {
          if (pwdPattern.body) {
            return of(pwdPattern.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PwdPattern());
  }
}

export const pwdPatternRoute: Routes = [
  {
    path: '',
    component: PwdPatternComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keybossApp.pwdPattern.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PwdPatternDetailComponent,
    resolve: {
      pwdPattern: PwdPatternResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keybossApp.pwdPattern.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PwdPatternUpdateComponent,
    resolve: {
      pwdPattern: PwdPatternResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keybossApp.pwdPattern.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PwdPatternUpdateComponent,
    resolve: {
      pwdPattern: PwdPatternResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keybossApp.pwdPattern.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
