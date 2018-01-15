import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PagesRoutingModule} from './pages-routing.module';
import {KickstartComponent} from './kickstart/kickstart.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule
  ],
  declarations: [KickstartComponent],
  providers: []
})
export class PagesModule {
}
