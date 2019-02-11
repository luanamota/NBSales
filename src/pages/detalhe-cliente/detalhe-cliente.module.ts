import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheClientePage } from './detalhe-cliente';

@NgModule({
  declarations: [
    DetalheClientePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheClientePage),
  ],
})
export class DetalheClientePageModule {}
