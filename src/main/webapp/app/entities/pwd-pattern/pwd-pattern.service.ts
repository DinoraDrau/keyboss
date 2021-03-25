import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPwdPattern } from 'app/shared/model/pwd-pattern.model';

type EntityResponseType = HttpResponse<IPwdPattern>;
type EntityArrayResponseType = HttpResponse<IPwdPattern[]>;

@Injectable({ providedIn: 'root' })
export class PwdPatternService {
  public resourceUrl = SERVER_API_URL + 'api/pwd-patterns';

  constructor(protected http: HttpClient) {}

  create(pwdPattern: IPwdPattern): Observable<EntityResponseType> {
    return this.http.post<IPwdPattern>(this.resourceUrl, pwdPattern, { observe: 'response' });
  }

  update(pwdPattern: IPwdPattern): Observable<EntityResponseType> {
    return this.http.put<IPwdPattern>(this.resourceUrl, pwdPattern, { observe: 'response' });
  }

  find(id: string): Observable<EntityResponseType> {
    return this.http.get<IPwdPattern>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPwdPattern[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
