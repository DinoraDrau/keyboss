import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IResourcePwd } from 'app/shared/model/resource-pwd.model';

@Component({
  selector: 'jhi-resource-pwd-detail',
  templateUrl: './resource-pwd-detail.component.html',
})
export class ResourcePwdDetailComponent implements OnInit {
  resourcePwd: IResourcePwd | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resourcePwd }) => (this.resourcePwd = resourcePwd));
  }

  previousState(): void {
    window.history.back();
  }
}
