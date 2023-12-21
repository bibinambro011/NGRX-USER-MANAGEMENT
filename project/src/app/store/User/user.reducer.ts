import { createReducer, on } from "@ngrx/store"
import { UserState } from "./user.state"
import { addUserSuccess, delUserSuccess, duplicateUserSuccess, editUserSucc, getLoginUserSucc, loadUserSuccess } from "./user.action"

const _userReducer = createReducer(UserState,
  
      on(loadUserSuccess,(state,action)=>{
        return {...state,list:[...action.list]}
      }),
      on(addUserSuccess,(state,action)=>{
        return {...state,list:[...state.list,action.userdata]}
      }),
      on(duplicateUserSuccess,(state,action)=>{
        return {...state,isDuplicate:action.isDuplicate}
      }),
      on(delUserSuccess,(state,action)=>{
        const newData=state.list.filter(o=>o.email!==action.email);
        return {...state,list:newData}
      }),
      on(editUserSucc,(state,action)=>{
        const newData=state.list.map(val=>{
          if(val.email===action.email)
          {
            return {
              ...val,
              email: action.userobj.email,
              name: action.userobj.name
            };
          }
          return val
        })
    
        return {...state,list:[...newData]}
      }),on(getLoginUserSucc,(state,action)=>{
       
        
        const obj={
          name:action.userobj.name as string,
          email:action.userobj.email as string,
          profile:action.userobj.profile as string,
        }
        return {...state,userobj:obj}
      })
      )


export function UserReducer(state:any, action: any) {
    return _userReducer(state, action);
  }