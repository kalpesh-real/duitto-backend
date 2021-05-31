import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  USER: any;
  newCustomer=false;
  constructor() {
  }

  get(name) {
    let data = JSON.parse(localStorage.getItem(name));
    return data;
  }
  set(name, value) {
    let data = JSON.stringify(value);
    localStorage.setItem(name, data);
  }

  clear(name) {
    localStorage.removeItem(name);
  }
  clearAll() {
    localStorage.clear();
  }

  checkUserSection() {
    return this.get("user") ? true : false;
  }

  getUserProperty(name) {
    this.USER = this.get("user");
    if (this.USER)
      return this.USER[name];
  }

}
