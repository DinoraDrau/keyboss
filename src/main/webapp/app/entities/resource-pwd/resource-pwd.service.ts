import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IResourcePwd } from 'app/shared/model/resource-pwd.model';

type EntityResponseType = HttpResponse<IResourcePwd>;
type EntityArrayResponseType = HttpResponse<IResourcePwd[]>;

@Injectable({ providedIn: 'root' })
export class ResourcePwdService {
  public resourceUrl = SERVER_API_URL + 'api/resource-pwds';

  constructor(protected http: HttpClient) {}

  create(resourcePwd: IResourcePwd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resourcePwd);
    return this.http
      .post<IResourcePwd>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(resourcePwd: IResourcePwd): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(resourcePwd);
    return this.http
      .put<IResourcePwd>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http
      .get<IResourcePwd>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IResourcePwd[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(resourcePwd: IResourcePwd): IResourcePwd {
    const copy: IResourcePwd = Object.assign({}, resourcePwd, {
      createdAt: resourcePwd.createdAt && resourcePwd.createdAt.isValid() ? resourcePwd.createdAt.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt ? moment(res.body.createdAt) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((resourcePwd: IResourcePwd) => {
        resourcePwd.createdAt = resourcePwd.createdAt ? moment(resourcePwd.createdAt) : undefined;
      });
    }
    return res;
  }
}
