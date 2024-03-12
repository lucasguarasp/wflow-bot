import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigComponentsComponent } from './config-components.component';
import { NavTabsConfigComponent } from './nav-tabs-config/nav-tabs-config.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ConfigComponentsComponent, NavTabsConfigComponent]
})
export class ConfigComponentsModule { }
