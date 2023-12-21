import { createEntityAdapter } from "@ngrx/entity";
import { User, UserModel } from "../model";

export const UserAdapter=createEntityAdapter<User>()

export const UserState:UserModel=UserAdapter.getInitialState({
    isDuplicate:false,
    list:[],
    userobj:{
      name:'',
      email:'',
      profile:''
    }
  })
  
  