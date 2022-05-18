import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ContactItemComponent } from './contact-item.component';




describe('ContactItemComponent: to render contact item', () => {
    var fixture: ComponentFixture<ContactItemComponent>;
    var contactItemComponent: ContactItemComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        ContactItemComponent
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(ContactItemComponent);
    contactItemComponent = fixture.componentInstance;
    contactItemComponent.data =  {
      "firstName": "Akash",
      "lastName": "Patel",
      "phone": "9876543210",
      "id": 1
    };
    fixture.detectChanges();
  });

  it('should create the ContactItem Component', () => {
    expect(contactItemComponent).toBeTruthy();
  });

  it('All data (first name, last name, phone) available to view', () => {
    let element  = fixture.debugElement.queryAll(By.css('.item-container .item'));
    let firstName = element[0].nativeElement;
    let lastName = element[1].nativeElement;
    let phone = element[2].nativeElement;
    expect(firstName.innerHTML).toContain(contactItemComponent.data.firstName);
    expect(lastName.innerHTML).toContain(contactItemComponent.data.lastName);
    expect(phone.innerHTML).toContain(contactItemComponent.data.phone);
  });


  it('Should emit delete on click of delete button', () => {
    spyOn(contactItemComponent.deleteData, 'emit');
    let element  = fixture.debugElement.queryAll(By.css('.item-container .item.action .delete'));
    const deleteBtn = element[0].nativeElement
    deleteBtn.click();
    expect(contactItemComponent.deleteData.emit).toHaveBeenCalled();
    expect(contactItemComponent.deleteData.emit).toHaveBeenCalledWith(1);
  });

  it('Should emit update on click of update button', () => {
    spyOn(contactItemComponent.updateData, 'emit');
    let element  = fixture.debugElement.queryAll(By.css('.item-container .item.action .update'));
    const deleteBtn = element[0].nativeElement
    deleteBtn.click();
    expect(contactItemComponent.updateData.emit).toHaveBeenCalled();
    expect(contactItemComponent.updateData.emit).toHaveBeenCalledWith(contactItemComponent.data); 
  });
});
