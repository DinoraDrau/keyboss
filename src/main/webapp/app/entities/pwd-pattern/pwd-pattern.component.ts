import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPwdPattern } from 'app/shared/model/pwd-pattern.model';
import { PwdPatternService } from './pwd-pattern.service';
import { PwdPatternDeleteDialogComponent } from './pwd-pattern-delete-dialog.component';

@Component({
  selector: 'jhi-pwd-pattern',
  templateUrl: './pwd-pattern.component.html',
})
export class PwdPatternComponent implements OnInit, OnDestroy {
  pwdPatterns?: IPwdPattern[];
  eventSubscriber?: Subscription;

  constructor(protected pwdPatternService: PwdPatternService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.pwdPatternService.query().subscribe((res: HttpResponse<IPwdPattern[]>) => (this.pwdPatterns = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPwdPatterns();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPwdPattern): string {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPwdPatterns(): void {
    this.eventSubscriber = this.eventManager.subscribe('pwdPatternListModification', () => this.loadAll());
  }

  delete(pwdPattern: IPwdPattern): void {
    const modalRef = this.modalService.open(PwdPatternDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.pwdPattern = pwdPattern;
  }
}
