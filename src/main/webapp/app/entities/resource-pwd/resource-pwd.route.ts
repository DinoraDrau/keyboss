import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IResourcePwd, ResourcePwd } from 'app/shared/model/resource-pwd.model';
import { ResourcePwdService } from './resource-pwd.service';
import { ResourcePwdComponent } from './resource-pwd.component';
import { ResourcePwdDetailComponent } from './resource-pwd-detail.component';
import { ResourcePwdUpdateComponent } from './resource-pwd-update.component';

@Injectable({ providedIn: 'root' })
export class ResourcePwdResolve implements Resolve<IResourcePwd> {
  constructor(private service: ResourcePwdService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IResourcePwd> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((resourcePwd: HttpResponse<ResourcePwd>) => {
          if (resourcePwd.body) {
            return of(resourcePwd.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ResourcePwd());
  }
}

export const resourcePwdRoute: Routes = [
  {
    path: '',
    component: ResourcePwdComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keybossApp.resourcePwd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ResourcePwdDetailComponent,
    resolve: {
      resourcePwd: ResourcePwdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keybossApp.resourcePwd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ResourcePwdUpdateComponent,
    resolve: {
      resourcePwd: ResourcePwdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keybossApp.resourcePwd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ResourcePwdUpdateComponent,
    resolve: {
      resourcePwd: ResourcePwdResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'keybossApp.resourcePwd.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
