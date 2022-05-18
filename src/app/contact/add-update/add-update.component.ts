import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-update-contact',
  templateUrl: './add-update.component.html',
  styleUrls: ['./add-update.component.scss'],
})
export class AddUpdateComponent implements OnInit, OnChanges {
  @Input('data') data;
  @Output('saveData') saveData = new EventEmitter();
  addUpdateForm: FormGroup;
  operation: String;
  isSubmit = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.operation = Object.keys(this.data).length ? 'Update' : 'Add';
  }

  createForm() {
    this.addUpdateForm = this.fb.group({
      firstName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
      ],
      lastName: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+')],
      ],
      phone: [
        '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')],
      ],
    });
  }

  submitForm() {
    this.isSubmit = true;
    if (this.addUpdateForm.valid) {
      this.saveData.emit(this.data);
      this.isSubmit = false;
    }
  }
}
