import { Injectable } from '@angular/core';
import { FormSaveReply } from '../formSaveReply';
import { MyFormData } from './my-form-data';

@Injectable()
export class MyFormSaveService {

  constructor() { }

  async save(data: MyFormData): Promise<FormSaveReply> {


    let p: Promise<FormSaveReply> = new Promise<FormSaveReply>((resolve, reject) => {

      window.setTimeout(() => {

        console.log(`Form data: ${JSON.stringify(data)}`)

        let r: FormSaveReply = {};

        if (data.lastName == "Fail") {
          r.isFailure = true;
          r.failureMessage = "Nie udało się zapisać zmian, błąd na żądanie użytkownika.";

        } else if (data.lastName == "Error") {
          r.isError = true;
          r.errors = ["Wartość jest niewystarczająca.", "Podane wartości są bez sensu!"];
        }
        else {
          r.isSuccess = true;
        }

        resolve(r);
      }, 3000);

    });

    let r : FormSaveReply = await p;

    return r;
  }

}
