import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


import { AuthService } from '../services/auth.service';
import { UserInfo } from '../store/model';

export const authGuard: CanActivateFn = (route, state) => {
  const service=inject(AuthService)
  const router=inject(Router)
  const userInfo:UserInfo=service.getFromLocal()

  if(service.getToken()){
    return !!localStorage.getItem('token')
  }else{
    router.navigate(['login'])
    return false
  }
};
