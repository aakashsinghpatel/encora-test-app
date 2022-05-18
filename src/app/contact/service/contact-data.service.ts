import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { API_CONSTANT } from '../../shared/constants/api-constant';
import { CommonService } from '../../shared/service/common.service';
import { ContactData } from '../model/contact.model';

@Injectable()
export class ContactDataService {
  private _contactData = new Subject<ContactData[]>();
  contactData$ = this._contactData.asObservable();

  private contactList: ContactData[] = [];

  constructor(private commonService: CommonService) {}

  getContactData() {
    this.commonService.get(API_CONSTANT.API_NAME.GET_CONTACT_DATA).subscribe(
      (res) => {
        this.storeData(res);
      },
      (err) => {
        this.storeData([]);
      }
    );
  }

  storeData(data) {
    this.contactList = data;
    this._contactData.next(Object.assign([], data));
  }

  addOrUpdateItem(item: any) {
    if (!item['id']) {
      let newId =
        Number(this.contactList[this.contactList.length - 1]['id']) + 1;
      item['id'] = newId;
      item = { ...item };
      this.contactList.push(item);
    } else {
      let index;
      this.contactList = this.contactList.filter((data, i) => {
        if (data['id'] != item['id']) {
          return data;
        } else {
          index = i;
          return null;
        }
      });
      this.contactList.splice(index, 0, item);
    }
    this.storeData(this.contactList);
  }

  remove(id: Number) {
    this.contactList.forEach((t, i) => {
      if (t.id === id) {
        this.contactList.splice(i, 1);
      }
      this._contactData.next(Object.assign([], this.contactList));
    });
  }
}
