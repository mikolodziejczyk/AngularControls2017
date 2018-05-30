import { Injectable } from '@angular/core';

import { FormMetadata } from './formMetadata';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FormMetadataService {

  constructor(private http: HttpClient) { }

  async getMetadata(url: string): Promise<FormMetadata> {
    let o = this.http.get<FormMetadata>(url);
    let r: FormMetadata = await o.toPromise();

    return r;
  }
}


