import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PanelModule } from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MenuModule } from 'primeng/menu';
import { PaginatorModule } from 'primeng/paginator';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    BreadcrumbModule,
    CardModule,
    MessageModule,
    InputTextModule,
    InputTextareaModule,
    PanelModule,
    RatingModule,
    ToastModule,
    InputMaskModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    MenuModule,
    PaginatorModule,
    KeyFilterModule
  ],
  providers: [
    MessageService
  ],
  exports: [
    BreadcrumbModule,
    CardModule,
    ButtonModule,
    MessageModule,
    InputTextModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    PanelModule,
    RatingModule,
    ToastModule,
    InputMaskModule,
    InputSwitchModule,
    ProgressSpinnerModule,
    MenuModule,
    PaginatorModule,
    KeyFilterModule
  ]
})

export class PrimengModule { }