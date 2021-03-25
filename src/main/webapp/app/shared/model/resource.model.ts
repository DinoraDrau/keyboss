import { Moment } from 'moment';
import { IResourcePwd } from 'app/shared/model/resource-pwd.model';

export interface IResource {
  id?: string;
  name?: string;
  url?: string;
  image?: string;
  comment?: string;
  createdAt?: Moment;
  updatedAt?: Moment;
  resourcePwds?: IResourcePwd[];
}

export class Resource implements IResource {
  constructor(
    public id?: string,
    public name?: string,
    public url?: string,
    public image?: string,
    public comment?: string,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public resourcePwds?: IResourcePwd[]
  ) {}
}
