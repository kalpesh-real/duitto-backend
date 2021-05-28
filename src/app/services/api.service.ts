import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  serverUrl="http://localhost:8080/api/";
  productUrl="";
  orderDetails:any;
  constructor(public http: HttpClient) { }

  apiGET(param) {
    return this.http.get(this.serverUrl+param);
  }
  apiPOST(param, data) {
    return this.http.post(this.serverUrl+param, data);
  }
}
