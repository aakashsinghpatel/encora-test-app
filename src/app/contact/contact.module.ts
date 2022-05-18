import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDataService } from './service/contact-data.service';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactItemComponent } from './contact-list/contact-item/contact-item.component';
import { AddUpdateComponent } from './add-update/add-update.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, SharedModule, FormsModule],
  declarations: [
    ContactListComponent,
    ContactItemComponent,
    AddUpdateComponent,
  ],
  providers: [ContactDataService],
  exports: [ContactListComponent],
})
export class ContactModule {}
