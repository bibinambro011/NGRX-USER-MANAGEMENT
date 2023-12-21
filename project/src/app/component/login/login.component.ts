import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { beginLogin } from 'src/app/store/User/user.action';
import { User, Usercred } from 'src/app/store/model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private service: AuthService,private store:Store) {}
  userdata: any;

  Loginform = this.fb.group({
    name: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  proceedLogin() {
    if(this.Loginform.valid){
      const obj:Usercred={
        username:this.Loginform.value.name as string,
        password:this.Loginform.value.password as string
      }
      this.store.dispatch(beginLogin({usercred:obj}))
    }
  }
  resetlogin(){
    this.Loginform.reset()
  }
ngOnInit(){
  localStorage.clear()
}
}
