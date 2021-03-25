import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IResource, Resource } from 'app/shared/model/resource.model';
import { ResourceService } from './resource.service';

@Component({
  selector: 'jhi-resource-update',
  templateUrl: './resource-update.component.html',
})
export class ResourceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    url: [],
    image: [null, [Validators.required]],
    comment: [],
    createdAt: [null, [Validators.required]],
    updatedAt: [null, [Validators.required]],
  });

  constructor(protected resourceService: ResourceService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ resource }) => {
      if (!resource.id) {
        const today = moment().startOf('day');
        resource.createdAt = today;
        resource.updatedAt = today;
      }

      this.updateForm(resource);
    });
  }

  updateForm(resource: IResource): void {
    this.editForm.patchValue({
      id: resource.id,
      name: resource.name,
      url: resource.url,
      image: resource.image,
      comment: resource.comment,
      createdAt: resource.createdAt ? resource.createdAt.format(DATE_TIME_FORMAT) : null,
      updatedAt: resource.updatedAt ? resource.updatedAt.format(DATE_TIME_FORMAT) : null,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const resource = this.createFromForm();
    if (resource.id !== undefined) {
      this.subscribeToSaveResponse(this.resourceService.update(resource));
    } else {
      this.subscribeToSaveResponse(this.resourceService.create(resource));
    }
  }

  private createFromForm(): IResource {
    return {
      ...new Resource(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      url: this.editForm.get(['url'])!.value,
      image: this.editForm.get(['image'])!.value,
      comment: this.editForm.get(['comment'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      updatedAt: this.editForm.get(['updatedAt'])!.value ? moment(this.editForm.get(['updatedAt'])!.value, DATE_TIME_FORMAT) : undefined,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IResource>>): void {
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
}
