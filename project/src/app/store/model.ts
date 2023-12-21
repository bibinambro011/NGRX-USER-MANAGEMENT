import { EntityState } from "@ngrx/entity";
export interface User{
    name:string,
    email:string,
    password?:string,
    profile?:string
  }

 
  export interface UserInfo{
  
    name:string,
    email:string,
    profile:string
  }
  
  export interface Usercred{
    username:string,
    password:string,
  }
  
  export interface UserModel extends EntityState<User>{
    isDuplicate?:boolean
  list:User[]
  userobj:{
    name:string,
    email:string,
    profile:string
  }
  }