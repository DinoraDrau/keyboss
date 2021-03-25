import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { KeybossSharedModule } from 'app/shared/shared.module';
import { ResourcePwdComponent } from './resource-pwd.component';
import { ResourcePwdDetailComponent } from './resource-pwd-detail.component';
import { ResourcePwdUpdateComponent } from './resource-pwd-update.component';
import { ResourcePwdDeleteDialogComponent } from './resource-pwd-delete-dialog.component';
import { resourcePwdRoute } from './resource-pwd.route';

@NgModule({
  imports: [KeybossSharedModule, RouterModule.forChild(resourcePwdRoute)],
  declarations: [ResourcePwdComponent, ResourcePwdDetailComponent, ResourcePwdUpdateComponent, ResourcePwdDeleteDialogComponent],
  entryComponents: [ResourcePwdDeleteDialogComponent],
})
export class KeybossResourcePwdModule {}
