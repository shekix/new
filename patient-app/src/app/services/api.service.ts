import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { text } from 'stream/consumers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  http = inject(HttpClient)
  constructor() { }

  private RegistrationUrl = 'https://localhost:7252/api/User/CreateUser';
  private LoginUrl = 'https://localhost:7252/api/User/LoginUser';
  private UpdatePassUrl ='https://localhost:7252/api/User/UpdatePassword'

  registerUser(user:any):Observable<any>{
    return this.http.post<any>(this.RegistrationUrl,user,{responseType:'text' as 'json'} )
  }

  loginUser(user:any):Observable<any>{
    return this.http.post<any>(this.LoginUrl,user,{responseType :'text' as 'json'});
  }

  UpdatePass(user:any):Observable<any>{
    return this.http.put<any>(this.UpdatePassUrl,user,{responseType :'text' as 'json'});
  }

  private login = false;

  isLoggedIn(value:boolean){
    this.login = value;
  }
   access(){
    return this.login;
   }


   private PatientUrl = 'https://localhost:7252/api/Patient'
   private putPatientUrl='https://localhost:7252/api/Patient?id='
   addPatient(data:any):Observable<any>{
    return this.http.post<any>(`${this.PatientUrl}/AddPatient`,data,{responseType:'text' as 'json'})
   }

   getPatients(data:any):Observable<any>{
    return this.http.get<any>(this.PatientUrl);
   }

   public updatePatient(id:any,data:any):Observable<any>{
    return this.http.put<any>(`${this.putPatientUrl}${id}`,data);
   }

   private countryUrl = 'https://localhost:7052/api/CountryState/GetCountries';
   private stateUrl = 'https://localhost:7052/api/CountryState';
   
   public getCountries():Observable<any[]>{
    return this.http.get<any[]>(this.countryUrl);
   }
 
   public getStates(id:any):Observable<any[]>{
    return this.http.get<any[]>(`${this.stateUrl}/${id}`);
   }

}
