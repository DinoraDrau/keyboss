import { Moment } from 'moment';
import { IResource } from 'app/shared/model/resource.model';

export interface IResourcePwd {
  id?: string;
  pwd?: string;
  createdAt?: Moment;
  resource?: IResource;
}

export class ResourcePwd implements IResourcePwd {
  constructor(public id?: string, public pwd?: string, public createdAt?: Moment, public resource?: IResource) {}
}
