import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarPedidoPage } from './consultar-pedido';

@NgModule({
  declarations: [
    ConsultarPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarPedidoPage),
  ],
})
export class ConsultarPedidoPageModule {}
