import { CommonModule } from '@angular/common';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed,  } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CommonService } from 'src/app/shared/service/common.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddUpdateComponent } from '../add-update/add-update.component';
import { ContactDataService } from '../service/contact-data.service';
import { ContactItemComponent } from './contact-item/contact-item.component';
import { ContactListComponent } from './contact-list.component';



describe('ContactListComponent: To show contact list', () => {
    var fixture: ComponentFixture<ContactListComponent>;
    var contactListComponent: ContactListComponent;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [
                CommonModule, ReactiveFormsModule, SharedModule, FormsModule, HttpClientTestingModule
            ],
            declarations: [
                ContactListComponent,
                ContactItemComponent,
                AddUpdateComponent,
            ],
            providers: [ContactDataService, CommonService]
        }).compileComponents();
    });
    beforeEach(() => {
        fixture = TestBed.createComponent(ContactListComponent);
        contactListComponent = fixture.componentInstance;
    });

    it('should create the ContactList Component', () => {
        expect(contactListComponent).toBeTruthy();
    });

    it('Should initilize the data into suject', () => {
        const contactDataService = fixture.debugElement.injector.get(ContactDataService);
        spyOn(contactDataService, 'getContactData')
        contactListComponent.ngOnInit();
        fixture.detectChanges();
        expect(contactDataService.getContactData).toHaveBeenCalled();
    });

    it('On initilizationn of data list should be available',  () => {
        const contactData = [
            {
                "firstName": "Amit",
                "lastName": "Roy",
                "phone": "9876543210",
                "id": 1
            },
            {
                "firstName": "Aakash",
                "lastName": "Choudhury",
                "phone": "9876584431",
                "id": 2
            }
        ];
        contactListComponent.contactData =  contactData ;
        fixture.detectChanges();
        const elements = fixture.debugElement.queryAll(By.css('contact-item'))
        expect(elements.length).toEqual(2);  
    });

    it('Add Item button should be present with add action', () => {
        const contactData = [
            {
                "firstName": "Amit",
                "lastName": "Roy",
                "phone": "9876543210",
                "id": 1
            }
        ];
        contactListComponent.contactData =  contactData;
        fixture.detectChanges();
        const elements = fixture.debugElement.queryAll(By.css('.btn-container.add-item button'))
        const button = elements[0].nativeElement;
        button.click();
        fixture.detectChanges()
        expect(button.innerHTML).toContain('Add Item');
        expect(contactListComponent.isModalOpen).toBeTruthy(); 
        expect(contactListComponent.modalData).toEqual({}); 
    });


    it('On deleteItem, remove action should be called with specific ID', () => {
        const contactDataService = fixture.debugElement.injector.get(ContactDataService);
        spyOn(contactDataService, 'remove');
        contactListComponent.deleteItem(2);
        fixture.detectChanges();
        expect(contactDataService.remove).toHaveBeenCalledWith(2);
    });

    it('On updateItem, modal should get open with specific data', async() => {
        const contactData = 
            {
                "firstName": "Amit abc",
                "lastName": "Roy ank",
                "phone": "9876543210",
                "id": 1
            };
        contactListComponent.updateItem({...contactData});
        fixture.detectChanges();
        expect(contactListComponent.isModalOpen).toBeTruthy(); 
        expect(contactListComponent.modalData).toEqual({...contactData}); 
    });

    it('On add or UpdateData, modal should get close with raising event to service', async() => {
        const contactDataService = fixture.debugElement.injector.get(ContactDataService);
        const contactData = 
            {
                "firstName": "Amit abc",
                "lastName": "Roy ank",
                "phone": "9876543210",
                "id": 1
            };
        spyOn(contactDataService, 'addOrUpdateItem')
        contactListComponent.addUpdateData({...contactData});
        fixture.detectChanges();
        expect(contactListComponent.isModalOpen).toBeFalsy(); 
        expect(contactDataService.addOrUpdateItem).toHaveBeenCalledWith({...contactData}); 
    });
});
