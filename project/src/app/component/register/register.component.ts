import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { beginRegister, duplicateUser } from 'src/app/store/User/user.action';
import { isDuplicateUser } from 'src/app/store/User/user.selector';
import { showalert } from 'src/app/store/common/app.action';
import { User } from 'src/app/store/model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private fb:FormBuilder, private service:AuthService,private router:Router,private store:Store){};
  registerform=this.fb.group({
    name:["",[Validators.required]],
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required]],
    confirmPassword:["",[Validators.required]]
  })

  Proceedregister(){
    if (this.registerform.valid) {
        if (this.registerform.value.password===this.registerform.value.confirmPassword) {
        const userobj:User={
          name:this.registerform.value.name as string,
          email:this.registerform.value.email as string,
          password:this.registerform.value.password as string,
        }
        this.store.dispatch(beginRegister({userdata:userobj}))
        } else {
        this.store.dispatch(showalert({message:'Password Mismatch',resulttype:'fail'}))
        }
      }
    
    }
    DuplicateUser(){
      const email=this.registerform.value.email||''
      if(email!==''){
       this.store.dispatch(duplicateUser({username:email}))
       this.store.select(isDuplicateUser).subscribe(isExist=>{
         if(isExist){
           console.log(isExist)
           this.registerform.controls['email'].reset()
         }
       })
      }
     }
}
