import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarPedidoPage } from './adicionar-pedido';

@NgModule({
  declarations: [
    AdicionarPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarPedidoPage),
  ],
})
export class AdicionarPedidoPageModule {}
