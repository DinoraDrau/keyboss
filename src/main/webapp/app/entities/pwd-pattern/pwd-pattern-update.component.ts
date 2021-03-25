import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPwdPattern, PwdPattern } from 'app/shared/model/pwd-pattern.model';
import { PwdPatternService } from './pwd-pattern.service';

@Component({
  selector: 'jhi-pwd-pattern-update',
  templateUrl: './pwd-pattern-update.component.html',
})
export class PwdPatternUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    pwdPattern: [null, [Validators.required]],
  });

  constructor(protected pwdPatternService: PwdPatternService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pwdPattern }) => {
      this.updateForm(pwdPattern);
    });
  }

  updateForm(pwdPattern: IPwdPattern): void {
    this.editForm.patchValue({
      id: pwdPattern.id,
      name: pwdPattern.name,
      pwdPattern: pwdPattern.pwdPattern,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pwdPattern = this.createFromForm();
    if (pwdPattern.id !== undefined) {
      this.subscribeToSaveResponse(this.pwdPatternService.update(pwdPattern));
    } else {
      this.subscribeToSaveResponse(this.pwdPatternService.create(pwdPattern));
    }
  }

  private createFromForm(): IPwdPattern {
    return {
      ...new PwdPattern(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      pwdPattern: this.editForm.get(['pwdPattern'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPwdPattern>>): void {
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
