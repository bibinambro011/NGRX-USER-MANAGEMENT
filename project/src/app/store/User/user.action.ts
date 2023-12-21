import { createAction, props } from "@ngrx/store"
import { User, UserInfo, Usercred } from "../model"

export const BEGIN_REGISTER='[auth] begin register'
export const BEGIN_LOGIN='[auth] begin login'
export const BEGIN_AD_LOGIN='[auth] begin admin login'
export const DUPLICATE_USER='[auth] duplicate user'
export const DUPLICATE_USER_SUCCESS='[auth] duplicate user success'
export const LOGIN_SUCCESS='[auth] login success'
export const LOAD_USER='[auth] login USER'
export const ADD_USER='[auth] add USER'
export const DEL_USER='[auth] delete USER'
export const EDIT_USER='[auth] edit USER'
export const ADD_USER_SUCCESS='[auth] add USER success'
export const LOAD_USER_SUCCESS='[auth] login USER success'
export const DEL_USER_SUCCESS='[auth] delete USER success'
export const EDIT_USER_SUCCESS='[auth] edit USER success'
export const AD_LOGIN_SUCCESS='[auth] edit USER success'
export const GET_LOGGED_IN='[auth] logged in USER'
export const GET_LOGGED_IN_SUCC='[auth] logged in USER success'


export const beginRegister=createAction(BEGIN_REGISTER, props<{userdata:User}>())
export const beginLogin=createAction(BEGIN_LOGIN, props<{usercred:Usercred}>())
export const duplicateUser=createAction(DUPLICATE_USER, props<{username:string}>())
export const duplicateUserSuccess=createAction(DUPLICATE_USER_SUCCESS, props<{isDuplicate:boolean}>())
export const loginSucc=createAction(LOGIN_SUCCESS, props<{userInfo:UserInfo}>())

export const beginAdLogin=createAction(BEGIN_AD_LOGIN, props<{usercred:Usercred}>())
export const beginAdLoginSucc=createAction(AD_LOGIN_SUCCESS, props<{usercred:Usercred}>())
export const loadUsers=createAction(LOAD_USER)
export const loadUserSuccess=createAction(LOAD_USER_SUCCESS,props<{list:User[]}>())
export const addUser=createAction(ADD_USER, props<{userdata:User}>())
export const addUserSuccess=createAction(ADD_USER_SUCCESS, props<{userdata:User}>())

export const delUser=createAction(DEL_USER, props<{email:string}>())
export const delUserSuccess=createAction(DEL_USER_SUCCESS, props<{email:string}>())

export const editUser=createAction(EDIT_USER,props<{userobj:User,email:string}>())
export const editUserSucc=createAction(EDIT_USER_SUCCESS,props<{userobj:User,email:string}>())

export const getLoginUser=createAction(GET_LOGGED_IN)
export const getLoginUserSucc=createAction(GET_LOGGED_IN_SUCC,props<{userobj:User}>())

