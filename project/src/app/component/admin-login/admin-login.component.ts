import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { beginAdLogin } from 'src/app/store/User/user.action';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private fb:FormBuilder,private store:Store){}

  ngOnInit(): void {
    
  }
  adminLoginform=this.fb.group({
    mail:['',[Validators.required]],
    password:['',[Validators.required]],
  })
  Proceedlogin(){
    if(this.adminLoginform.valid){
      const obj={
        username:this.adminLoginform.value.mail as string,
        password:this.adminLoginform.value.password as string
      }
      this.store.dispatch(beginAdLogin({usercred:obj}))
      
    }
  }
}
