import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlterarClientePage } from './alterar-cliente';

@NgModule({
  declarations: [
    AlterarClientePage,
  ],
  imports: [
    IonicPageModule.forChild(AlterarClientePage),
  ],
})
export class AlterarClientePageModule {}
