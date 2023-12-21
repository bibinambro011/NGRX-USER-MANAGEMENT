import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserInfo, UserModel } from "../model";

const getUserState=createFeatureSelector<UserModel>('user')
const getUser=createFeatureSelector<UserInfo>('user')
export const isDuplicateUser=createSelector(getUserState,(state)=>state.isDuplicate)
export const selectUserInfo = createSelector(
    getUser,
    (state) => state
  );
  export const getUserList = createSelector(
    getUserState,
    (state) => state.list
  );
  export const getLoggedUser = createSelector(
    getUserState,
    (state) => state.userobj
  );
  