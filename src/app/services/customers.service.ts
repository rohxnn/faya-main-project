import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map,filter, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
url:string='https://retoolapi.dev/TMekp1/data';
  constructor(private http:HttpClient) { }

    fetchCustomer(): Observable<any>{
      return this.http.get(this.url).pipe((map((data)=>{
      return data; }))); 
    }

    getbyId(id:any): Observable<any>{
      let url=`${this.url}/${id}`;
      return this.http.get(url).pipe((map((data)=>{
      return data; })));
      }

    deletebyId(id:any): Observable<any>{
      let url= `${this.url}/${id}`;
      return this.http.delete(url).pipe((map((data) => {
        return data;
      })));
    }

    updatebyId(id:any,value:any): Observable<any>{
      let url=`${this.url}/${id}`;
      return this.http.patch(url,value).pipe((map((data) => {
        return data;})))
    }

    createUser(value){
      return this.http.post(this.url,value).pipe((map((data) => {
        return data; })))
    }
}
