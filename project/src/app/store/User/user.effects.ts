import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "src/app/services/auth.service";
import { beginLogin, beginRegister, duplicateUser,loadUserSuccess, duplicateUserSuccess, loadUsers, beginAdLogin, addUser, addUserSuccess, delUser, delUserSuccess, editUser, editUserSucc, getLoginUser, getLoginUserSucc } from "./user.action";
import { EMPTY, catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { Router } from "@angular/router";
import { showalert } from "../common/app.action";

@Injectable()
export class UserEffect{
    constructor(private actions$:Actions,private service:AuthService,private route:Router){}
    userRegister=createEffect(()=>
    this.actions$.pipe(
      ofType(beginRegister),exhaustMap((action)=>{
        return this.service.UserRegistration(action.userdata).pipe(
          map(()=>{ 
            this.route.navigate(['login'])
            return showalert({message:'Registered Successfully.',resulttype:'pass'})
          }),
          catchError((error)=>{
            console.log(error)
            return of(showalert({message:`Registration Failed==>${error.me}`,resulttype:'fail'}))
          })
        )
      })
    )  
  )
  userLogin=createEffect(()=>
  this.actions$.pipe(
    ofType(beginLogin),switchMap((action)=>{
      return this.service.UserLogin(action.usercred).pipe(
        exhaustMap((data)=>{

          console.log(data) 
          if(data){
           
            localStorage.setItem('token',JSON.parse(JSON.stringify(data)).token)
            this.route.navigate([''])
            return of(
            showalert({message:'Login Successful.',resulttype:'pass'}))
          }else{
            // this.route.navigate(['login'])
          return of(showalert({message:'Login Failed.',resulttype:'fail'}))
          }
          
        }),
        catchError((error)=>{
          console.log(error)
          return of(showalert({message:`Login Failed==>${error.message}`,resulttype:'fail'}))
        })
      )
    })
  )  
)
usersLoad=createEffect(()=>
this.actions$.pipe(ofType(loadUsers),exhaustMap((action)=>{
  return this.service.getAllusers().pipe(
    map((data)=>{
      return loadUserSuccess({list:data})
    }),
    catchError((error)=>{
      console.log(error)
      // this.route.navigate(['admin'])
      localStorage.clear()
      return of(showalert({message:`Loading Failed==>${error.message}`,resulttype:'fail'}))
    })
  )
}))
)

_deleteassociate = createEffect(() =>
this.actions$.pipe(
    ofType(delUser),
    exhaustMap((action) => {
        return this.service.deleteUser(action.email).pipe(
            exhaustMap(() => {
                return of(delUserSuccess({ email:action.email }),
                    showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
            }),
            catchError((_error) => of(showalert({ message: 'Failed to delete user', resulttype: 'fail' })))
        )
    })
)
)
_editUser = createEffect(() =>
this.actions$.pipe(
    ofType(editUser),
    exhaustMap((action) => {
        return this.service.editUser(action.userobj,action.email).pipe(
            switchMap((data) => {
              console.log(data)
              const jstr=JSON.stringify(data)
              const obj=JSON.parse(jstr)
                return of(editUserSucc({userobj:obj,email:action.email}),
                    showalert({ message: 'Updated successfully.', resulttype: 'pass' }))
            }),
            catchError((_error) => of(showalert({ message: 'Failed to Edit user', resulttype: 'fail' })))
        )
    })
)
)
adminLogin=createEffect(()=>
this.actions$.pipe(
  ofType(beginAdLogin),switchMap((action)=>{
    return this.service.AdminLogin(action.usercred).pipe(
      switchMap((data)=>{
        console.log(data) 
        if(data){
          localStorage.setItem('token',JSON.parse(JSON.stringify(data)).token)
          
          this.route.navigate(['adminHome'])
          return of(
          showalert({message:'Login Successful.',resulttype:'pass'})
          )
        }else{
        return of(showalert({message:'Login Failed.',resulttype:'fail'}))
        }
        
      }),
      catchError((error)=>{
        console.log(error)
        return of(showalert({message:`Login Failed==>${error.message}`,resulttype:'fail'}))
      })
    )
  })
)  
)
_getLoginUser=createEffect(()=>
this.actions$.pipe(ofType(getLoginUser),exhaustMap(()=>{
 
return this.service.getLoggedUser().pipe(
  exhaustMap((data)=>{
  
    return of(getLoginUserSucc({userobj:JSON.parse(JSON.stringify(data)).user}),
    )

  }),
  catchError((error)=>of(showalert({ message: 'Failed to Edit user', resulttype: 'fail' })))
)

}))
)
addUserbyAdmin=createEffect(()=>
    this.actions$.pipe(
      ofType(addUser),exhaustMap((action)=>{
        return this.service.UserRegistration(action.userdata).pipe(
          switchMap((data)=>{ 
          console.log(typeof data)
            const jstr=JSON.stringify(data)
            const obj=JSON.parse(jstr)
            console.log(obj.name)
            
            return of(addUserSuccess({userdata:obj}),showalert({message:'Registered Successfully.',resulttype:'pass'}))
          }),
          catchError((error)=>{
            console.log(error)
            return of(showalert({message:`Registration Failed==>${error.me}`,resulttype:'fail'}))
          })
        )
      })
    )  
  )

  
  duplicateuser=createEffect(()=>
    this.actions$.pipe(
      ofType(duplicateUser),switchMap((action)=>{
        return this.service.DuplicateUsername(action.username).pipe(
          switchMap((data)=>{ 
            
            if(data){
              return of(duplicateUserSuccess({isDuplicate:true}),
              showalert({message:'Email Already exist',resulttype:'fail'}))
            }else{
              return EMPTY
            }
          }),
          catchError((error)=>{
            console.log(error)
            return of(showalert({message:`error occurred==>${error.me}`,resulttype:'fail'}))
          })
        )
      })
    )  
  )
  
}


