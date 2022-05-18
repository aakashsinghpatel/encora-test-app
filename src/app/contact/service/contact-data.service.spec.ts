import { TestBed } from "@angular/core/testing";
import { CommonService } from "src/app/shared/service/common.service";
import { ContactDataService } from "./contact-data.service";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";



describe('ContactDataService', () => { 
    let contactDataService: ContactDataService;
    let controller: HttpTestingController
    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule
            ],
            providers: [ CommonService, ContactDataService]
        }).compileComponents();
    });
    beforeEach(() => {
        contactDataService = TestBed.inject(ContactDataService);
        controller = TestBed.inject(HttpTestingController);
    });

    it('should create the ContactList Component', () => {
        expect(contactDataService).toBeTruthy();
    });


    it('On adding new item, new data will be availabe with contactList', () =>{
        const newItem = {
                        "firstName": "Aakash",
                        "lastName": "Choudhury",
                        "phone": "9876584431",
                        "id": 5
                    };
        spyOn(contactDataService, 'storeData')
        contactDataService.addOrUpdateItem(newItem);
        expect(contactDataService.storeData).toHaveBeenCalled();
        expect(contactDataService.storeData).toHaveBeenCalledWith([newItem]);
    });

});


