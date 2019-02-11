import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AplicacaoProdutoPage } from './aplicacao-produto';

@NgModule({
  declarations: [
    AplicacaoProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(AplicacaoProdutoPage),
  ],
})
export class AplicacaoProdutoPageModule {}
