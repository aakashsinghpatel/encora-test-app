import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUpdateComponent } from './add-update.component';


describe('AddUpdateComponent: To create or update contact', () => {
  var fixture: ComponentFixture<AddUpdateComponent>;
  var addUpdateComponent: AddUpdateComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [
        AddUpdateComponent
      ],
    }).compileComponents();
  });
  beforeEach(async () => {
    fixture = TestBed.createComponent(AddUpdateComponent);
    addUpdateComponent = fixture.componentInstance;
    addUpdateComponent.ngOnInit();
  });

  it('should create the AddUpdate Component', () => {
    expect(addUpdateComponent).toBeTruthy();
  });

  it('Initialy Form should be invalid', () => {
    expect(addUpdateComponent.addUpdateForm.valid).toBeFalsy();
  });

  it('Initialy isSubmit should be false', () => {
    expect(addUpdateComponent.isSubmit).toBeFalsy();
  });

  it('Form field validity (first name, last name, phone) on required validation', () => {
    let firstName = addUpdateComponent.addUpdateForm.controls['firstName'];
    let lastName = addUpdateComponent.addUpdateForm.controls['lastName'];
    let phone = addUpdateComponent.addUpdateForm.controls['phone'];

    expect(firstName.valid).toBeFalsy();
    expect(lastName.valid).toBeFalsy();
    expect(phone.valid).toBeFalsy();
  });

  it('Phone field validity on pattern', () => {
    let phone = addUpdateComponent.addUpdateForm.controls['phone'];
    phone.setValue('12345678909')
    expect(phone.valid).toBeFalsy();
    phone.setValue('xyz')
    let errors = phone.errors || {};
    expect(phone['required']).toBeFalsy();
    expect(phone['pattern']).toBeFalsy();
    expect(phone.valid).toBeFalsy();
    phone.setValue('2345678909')
    expect(phone.valid).toBeTruthy();
  });


  it('On click of submit check validatity of form', () => {
    addUpdateComponent.submitForm();
    expect(addUpdateComponent.isSubmit).toBeTruthy();
    expect(addUpdateComponent.addUpdateForm.valid).toBeFalsy();

    let firstName = addUpdateComponent.addUpdateForm.controls['firstName'];
    let lastName = addUpdateComponent.addUpdateForm.controls['lastName'];
    let phone = addUpdateComponent.addUpdateForm.controls['phone'];

    expect(firstName.valid).toBeFalsy();
    expect(lastName.valid).toBeFalsy();
    expect(phone.valid).toBeFalsy();

    phone.setValue('12345678909')
    expect(phone.valid).toBeFalsy();
    phone.setValue('xyz')
    expect(phone.valid).toBeFalsy();
    phone.setValue('2345678909')
    expect(phone.valid).toBeTruthy();

    phone.setValue('12345678909')
    expect(phone.valid).toBeFalsy();
    phone.setValue('xyz')
    expect(phone.valid).toBeFalsy();
    phone.setValue('2345678909')
    expect(phone.valid).toBeTruthy();
  });

  it('successfull submision of form', () => {

    let firstName = addUpdateComponent.addUpdateForm.controls['firstName'];
    let lastName = addUpdateComponent.addUpdateForm.controls['lastName'];
    let phone = addUpdateComponent.addUpdateForm.controls['phone'];

    addUpdateComponent.submitForm();
    expect(addUpdateComponent.isSubmit).toBeTruthy();
    expect(addUpdateComponent.addUpdateForm.valid).toBeFalsy();
    phone.setValue('9134567890');
    firstName.setValue('Akash');
    lastName.setValue('Patel');

    expect(firstName.valid).toBeTruthy();
    expect(lastName.valid).toBeTruthy();
    expect(phone.valid).toBeTruthy();
    expect(addUpdateComponent.addUpdateForm.valid).toBeTruthy();
  });


  it('On successfull submision of form emit of event to save or update', () => {

    spyOn(addUpdateComponent.saveData, 'emit');



    let firstName = addUpdateComponent.addUpdateForm.controls['firstName'];
    let lastName = addUpdateComponent.addUpdateForm.controls['lastName'];
    let phone = addUpdateComponent.addUpdateForm.controls['phone'];



    phone.setValue('9134567890');
    firstName.setValue('Akash');
    lastName.setValue('Patel');
    addUpdateComponent.submitForm();

    expect(firstName.valid).toBeTruthy();
    expect(lastName.valid).toBeTruthy();
    expect(phone.valid).toBeTruthy();

    expect(addUpdateComponent.saveData.emit).toHaveBeenCalled();
  });
});
