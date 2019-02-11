import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarClientePage } from './consultar-cliente';

@NgModule({
  declarations: [
    ConsultarClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarClientePage),
  ],
})
export class ConsultarClientePageModule {}
