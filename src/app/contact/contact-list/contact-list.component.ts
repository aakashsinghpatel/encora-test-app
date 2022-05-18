import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalComponent } from '../../shared/component/modal/modal.component';
import { AddUpdateComponent } from '../add-update/add-update.component';
import { ContactData } from '../model/contact.model';
import { ContactDataService } from '../service/contact-data.service';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  contactData = [];
  modalData = {};
  isModalOpen: Boolean = false;

  @ViewChild(AddUpdateComponent) addUpdateComponent: AddUpdateComponent;

  constructor(private contactDataService: ContactDataService) {}

  ngOnInit() {
    this.contactDataService.getContactData();
    this.contactDataService.contactData$.subscribe(
      (res: any) => {
        this.contactData = res;
      },
      (err) => {
        this.contactData = [];
      }
    );
  }

  addItem() {
    this.isModalOpen = true;
    this.modalData = {};
  }

  deleteItem(id: Number) {
    this.contactDataService.remove(id);
  }

  updateItem(data: any) {
    this.isModalOpen = true;
    this.modalData = {...data};
  }

  addUpdateData(data: any) {
    this.isModalOpen = false;
    this.contactDataService.addOrUpdateItem(data);
  }

  closeModal() {
    this.isModalOpen = false;
    this.addUpdateComponent.isSubmit = false;
  }
}
