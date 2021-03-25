import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'resource',
        loadChildren: () => import('./resource/resource.module').then(m => m.KeybossResourceModule),
      },
      {
        path: 'resource-pwd',
        loadChildren: () => import('./resource-pwd/resource-pwd.module').then(m => m.KeybossResourcePwdModule),
      },
      {
        path: 'pwd-pattern',
        loadChildren: () => import('./pwd-pattern/pwd-pattern.module').then(m => m.KeybossPwdPatternModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class KeybossEntityModule {}
