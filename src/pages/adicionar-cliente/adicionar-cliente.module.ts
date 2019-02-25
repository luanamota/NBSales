import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdicionarClientePage } from './adicionar-cliente';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AdicionarClientePage,
  ],
  imports: [
    IonicPageModule.forChild(AdicionarClientePage),
    FormsModule
  ],
})
export class AdicionarClientePageModule {}
