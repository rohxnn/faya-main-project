import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map,filter, Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
url:string='https://retoolapi.dev/pFSax8/data';
  constructor(private http:HttpClient) { }

    fetchCustomer(){
      return this.http.get(this.url).pipe((map((data)=>{
      return data;
      }))); }

      getbyId(id:any){
          return this.http.get(this.url,id);
      }
    deletebyId(id:any): Observable<any>{
      let url= `${this.url}/${id}`;
      return this.http.delete(url);
    }
}
