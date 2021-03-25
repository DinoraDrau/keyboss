import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPwdPattern } from 'app/shared/model/pwd-pattern.model';

@Component({
  selector: 'jhi-pwd-pattern-detail',
  templateUrl: './pwd-pattern-detail.component.html',
})
export class PwdPatternDetailComponent implements OnInit {
  pwdPattern: IPwdPattern | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pwdPattern }) => (this.pwdPattern = pwdPattern));
  }

  previousState(): void {
    window.history.back();
  }
}
