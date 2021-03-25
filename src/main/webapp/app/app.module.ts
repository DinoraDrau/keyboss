import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { KeybossSharedModule } from 'app/shared/shared.module';
import { KeybossCoreModule } from 'app/core/core.module';
import { KeybossAppRoutingModule } from './app-routing.module';
import { KeybossHomeModule } from './home/home.module';
import { KeybossEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    KeybossSharedModule,
    KeybossCoreModule,
    KeybossHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    KeybossEntityModule,
    KeybossAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  bootstrap: [MainComponent],
})
export class KeybossAppModule {}
