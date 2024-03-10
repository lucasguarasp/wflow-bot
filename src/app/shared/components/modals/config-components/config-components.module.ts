import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponentsComponent } from './config-components.component';
import { NavConfigsModalComponent } from '../../nav-configs-modal/nav-configs-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ConfigComponentsComponent, NavConfigsModalComponent]
})
export class ConfigComponentsModule { }
