import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPwdPattern } from 'app/shared/model/pwd-pattern.model';
import { PwdPatternService } from './pwd-pattern.service';

@Component({
  templateUrl: './pwd-pattern-delete-dialog.component.html',
})
export class PwdPatternDeleteDialogComponent {
  pwdPattern?: IPwdPattern;

  constructor(
    protected pwdPatternService: PwdPatternService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.pwdPatternService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pwdPatternListModification');
      this.activeModal.close();
    });
  }
}
