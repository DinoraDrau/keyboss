import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IResourcePwd, ResourcePwd } from 'app/shared/model/resource-pwd.model';
import { ResourcePwdService } from './resource-pwd.service';
import { IResource } from 'app/shared/model/resource.model';
import { ResourceService } from 'app/entities/resource/resource.service';

@Component({
  selector: 'jhi-resource-pwd-update',
  templateUrl: './resource-pwd-update.component.html',
})
export class ResourcePwdUpdateComponent implements OnInit {
  isSaving = false;
  resources: IResource[] = [];

  editForm = this.fb.group({
    id: [],
    pwd: [null, [Validators.required]],
    createdAt: [null, [Validators.required]],
    resource: [],
  });

  constructor(
    protected resourcePwdService: ResourcePwdService,
    protected resourceService: ResourceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resourcePwd }) => {
      if (!resourcePwd.id) {
        const today = moment().startOf('day');
        resourcePwd.createdAt = today;
      }

      this.updateForm(resourcePwd);

      this.resourceService.query().subscribe((res: HttpResponse<IResource[]>) => (this.resources = res.body || []));
    });
  }

  updateForm(resourcePwd: IResourcePwd): void {
    this.editForm.patchValue({
      id: resourcePwd.id,
      pwd: resourcePwd.pwd,
      createdAt: resourcePwd.createdAt ? resourcePwd.createdAt.format(DATE_TIME_FORMAT) : null,
      resource: resourcePwd.resource,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resourcePwd = this.createFromForm();
    if (resourcePwd.id !== undefined) {
      this.subscribeToSaveResponse(this.resourcePwdService.update(resourcePwd));
    } else {
      this.subscribeToSaveResponse(this.resourcePwdService.create(resourcePwd));
    }
  }

  private createFromForm(): IResourcePwd {
    return {
      ...new ResourcePwd(),
      id: this.editForm.get(['id'])!.value,
      pwd: this.editForm.get(['pwd'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      resource: this.editForm.get(['resource'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResourcePwd>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IResource): any {
    return item.id;
  }
}
