import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {User, UserInfo, Usercred} from "../store/model"

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getAllusers(){
    return this.http.get<User[]>(`${this.ApiBaseUrl}/getAll`)
  }
  constructor(private http:HttpClient) { }
  ApiBaseUrl = 'http://localhost:3000'

  
  UserRegistration(userdata: any) {
    console.log("1111",userdata)
    return this.http.post(`${this.ApiBaseUrl}/register`, userdata)
  }
  
  UserLogin(userdata:Usercred){
    return this.http.get(`${this.ApiBaseUrl}/login?username=${userdata.username}&password=${userdata.password}`)
  }
  storeToLocal(userdata:UserInfo){
    localStorage.setItem('userdata',JSON.stringify(userdata))
  }

  DuplicateUsername(username:string){
    return this.http.get(`${this.ApiBaseUrl}/duplicate?username=${username}`)
  }
  AdminLogin(userdata:Usercred){
    return this.http.get<UserInfo>(`${this.ApiBaseUrl}/admin?username=${userdata.username}&password=${userdata.password}`)
  }
  deleteUser(email:string){
    console.log('aaaaaaa')
    return this.http.delete(`${this.ApiBaseUrl}/delete?email=${email}`,);
  }

  editUser(obj:User,email:string){
    const formData={
      newData:obj,
      oldMail:email
    }
    return this.http.post(`${this.ApiBaseUrl}/edit`,formData)
  }

  getFromLocal(){
    let obj:UserInfo={
      name: '',
      email: '',
      profile: '',
      
    }
    if(localStorage.getItem('userdata')){
      let str=localStorage.getItem('userdata') as string
      obj=JSON.parse(str)  
    }
    return obj
  }
  getToken(){
    return !!localStorage.getItem('token')
  }
  getLoggedUser(){
    console.log('hereeeee')
    return this.http.get(`${this.ApiBaseUrl}/getLogProfile`)
  }
  uploadImage(formData:FormData){
     console.log('serveice',formData)
    return this.http.post(`${this.ApiBaseUrl}/upload`,formData)
  }
}


