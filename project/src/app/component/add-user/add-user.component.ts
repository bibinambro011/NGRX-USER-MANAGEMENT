import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { addUser, duplicateUser, editUser } from 'src/app/store/User/user.action';
import { getUserList, isDuplicateUser } from 'src/app/store/User/user.selector';
import { showalert } from 'src/app/store/common/app.action';
import { User } from 'src/app/store/model';




@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  title = 'Add User'
  isedit = false;
  dialogdata: any;
  userdata!:User
  constructor(private fb:FormBuilder,private ref: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store){}


  ngOnInit(): void {
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    if(this.dialogdata.code){
      this.store.select(getUserList).subscribe(item=>{
        this.userdata=item.find(o=>o.email===this.dialogdata.code) as User
        this.userForm.setValue({
          name:this.userdata.name as string,
          email:this.userdata.email as string,
          password:'',
          confirmPassword:''
        })
        this.isedit=true
      })
    }
  }

  userForm=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    confirmPassword:['',[Validators.required]]
  })
  AddUser(){
    if(this.isedit){
        this.isedit=false
        const obj:User={
          name:this.userForm.value.name as string,
          email:this.userForm.value.email as string
        }
        this.store.dispatch(editUser({userobj:obj,email:this.dialogdata.code}))
        this.ClosePopup()
    }else{
      if (this.userForm.valid) {
        if (this.userForm.value.password===this.userForm.value.confirmPassword) {
        const userobj:User={
          name:this.userForm.value.name as string,
          email:this.userForm.value.email as string,
          password:this.userForm.value.password as string,
        }
        this.store.dispatch(addUser({userdata:userobj}))
        this.ClosePopup()
        } else {
        this.store.dispatch(showalert({message:'Password Mismatch',resulttype:'fail'}))
        }
      }
    }
  }
  ClosePopup() {
    this.ref.close();
  }

  DuplicateUser(){
    const email=this.userForm.value.email||''
    if(email!==''){
     this.store.dispatch(duplicateUser({username:email}))
     this.store.select(isDuplicateUser).subscribe(isExist=>{
       if(isExist){
         console.log(isExist)
         this.userForm.controls['email'].reset()
       }
     })
    }
   }
}
