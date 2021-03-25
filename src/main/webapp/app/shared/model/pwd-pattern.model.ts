export interface IPwdPattern {
  id?: string;
  name?: string;
  pwdPattern?: string;
}

export class PwdPattern implements IPwdPattern {
  constructor(public id?: string, public name?: string, public pwdPattern?: string) {}
}
