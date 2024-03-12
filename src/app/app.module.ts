import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DrawFlowModule } from './modules/draw-flow/draw-flow.module';
import { ConfigComponentsModule } from './shared/components/modals/config-components/config-components.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    SharedModule.forRoot(),
    DrawFlowModule,
    ConfigComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
