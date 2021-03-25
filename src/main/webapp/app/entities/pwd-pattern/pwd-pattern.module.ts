import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeybossSharedModule } from 'app/shared/shared.module';
import { PwdPatternComponent } from './pwd-pattern.component';
import { PwdPatternDetailComponent } from './pwd-pattern-detail.component';
import { PwdPatternUpdateComponent } from './pwd-pattern-update.component';
import { PwdPatternDeleteDialogComponent } from './pwd-pattern-delete-dialog.component';
import { pwdPatternRoute } from './pwd-pattern.route';

@NgModule({
  imports: [KeybossSharedModule, RouterModule.forChild(pwdPatternRoute)],
  declarations: [PwdPatternComponent, PwdPatternDetailComponent, PwdPatternUpdateComponent, PwdPatternDeleteDialogComponent],
  entryComponents: [PwdPatternDeleteDialogComponent],
})
export class KeybossPwdPatternModule {}
