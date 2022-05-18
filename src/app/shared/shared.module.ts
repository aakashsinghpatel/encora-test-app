import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalComponent } from './component/modal/modal.component';
import { CommonService } from './service/common.service';

@NgModule({
  imports: [CommonModule],
  declarations: [ModalComponent],
  providers: [CommonService],
  exports: [ModalComponent],
})
export class SharedModule {}
