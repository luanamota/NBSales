import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarClientePage } from './adicionar-cliente';

@NgModule({
  declarations: [
    AdicionarClientePage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarClientePage),
  ],
})
export class AdicionarClientePageModule {}
