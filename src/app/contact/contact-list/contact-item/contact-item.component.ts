import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ContactData } from '../../model/contact.model';

@Component({
  selector: 'contact-item',
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.scss'],
})
export class ContactItemComponent implements OnInit, OnChanges {
  @Input('data') data: any;

  @Output('delete') deleteData = new EventEmitter<Number>();
  @Output('update') updateData = new EventEmitter<ContactData>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {}

  delete(id: Number) {
    this.deleteData.emit(id);
  }

  update(itemData: any) {
    this.updateData.emit(itemData);
  }
}
