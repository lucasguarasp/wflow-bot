import { NgModule } from '@angular/core';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmacaoComponent } from './components/modals/confirmacao/confirmacao.component';
import { ConfigComponentsComponent } from './components/modals/config-components/config-components.component';
import { ConfigComponentsModule } from './components/modals/config-components/config-components.module';
import { BrowserModule } from '@angular/platform-browser';
import { DataFilterService } from './providers/data-filter.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule
  ],
  declarations: [ConfirmacaoComponent],
  providers: [DataFilterService],
  exports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, BrowserModule, ConfirmacaoComponent, ConfigComponentsModule, KeyValuePipe]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
      ]
    }
  }
}
