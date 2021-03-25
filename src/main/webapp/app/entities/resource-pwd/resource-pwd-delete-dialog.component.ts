import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IResourcePwd } from 'app/shared/model/resource-pwd.model';
import { ResourcePwdService } from './resource-pwd.service';

@Component({
  templateUrl: './resource-pwd-delete-dialog.component.html',
})
export class ResourcePwdDeleteDialogComponent {
  resourcePwd?: IResourcePwd;

  constructor(
    protected resourcePwdService: ResourcePwdService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: string): void {
    this.resourcePwdService.delete(id).subscribe(() => {
      this.eventManager.broadcast('resourcePwdListModification');
      this.activeModal.close();
    });
  }
}
