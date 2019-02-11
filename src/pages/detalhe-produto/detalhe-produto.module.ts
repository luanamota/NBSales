import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheProdutoPage } from './detalhe-produto';

@NgModule({
  declarations: [
    DetalheProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheProdutoPage),
  ],
})
export class DetalheProdutoPageModule {}
