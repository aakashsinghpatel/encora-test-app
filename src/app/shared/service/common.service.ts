import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  private BASE_API_PATH = 'https://my-json-server.typicode.com';

  constructor(private http: HttpClient) {}

  get(path: any) {
    return this.http.get(this.BASE_API_PATH + path);
  }
}
