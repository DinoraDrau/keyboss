import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IResourcePwd } from 'app/shared/model/resource-pwd.model';
import { ResourcePwdService } from './resource-pwd.service';
import { ResourcePwdDeleteDialogComponent } from './resource-pwd-delete-dialog.component';

@Component({
  selector: 'jhi-resource-pwd',
  templateUrl: './resource-pwd.component.html',
})
export class ResourcePwdComponent implements OnInit, OnDestroy {
  resourcePwds?: IResourcePwd[];
  eventSubscriber?: Subscription;

  constructor(
    protected resourcePwdService: ResourcePwdService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.resourcePwdService.query().subscribe((res: HttpResponse<IResourcePwd[]>) => (this.resourcePwds = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInResourcePwds();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IResourcePwd): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInResourcePwds(): void {
    this.eventSubscriber = this.eventManager.subscribe('resourcePwdListModification', () => this.loadAll());
  }

  delete(resourcePwd: IResourcePwd): void {
    const modalRef = this.modalService.open(ResourcePwdDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.resourcePwd = resourcePwd;
  }
}
