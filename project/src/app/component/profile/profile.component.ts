import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnInitEffects } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/services/auth.service';
import { getLoginUser } from 'src/app/store/User/user.action';
import { getLoggedUser } from 'src/app/store/User/user.selector';
import { User } from 'src/app/store/model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userdata!:User
  img!:string
  tempimag:string='image-1703135833884.jpg'
  constructor(private store:Store,private service:AuthService,private router:Router){}

  ngOnInit(): void {
    this.store.dispatch(getLoginUser())
    this.store.select(getLoggedUser).subscribe(data=>{
      this.userdata=data
      console.log('userdata is========>',this.userdata)
      this.img=this.userdata.profile?this.userdata.profile:this.tempimag
    })
    // console.log(this.userdata.name)
    
    
  }
  
  changeImg(inp:any){
    inp.click()
  }
  fileUpload(event:any){
    // console.log(event.target.files[0])
    const file=event.target.files[0]
    console.log(file)
    if(file){
      const formData = new FormData();
      formData.append('image', file);
      formData.append('email', this.userdata.email);
      console.log(formData)
      this.service.uploadImage(formData).subscribe(data=>{
        console.log(typeof data)
        this.img=data.toString()
        // this.userdata.profile=this.img
        // this.service.storeToLocal(this.userdata)
      })
    }
  }
  logout(){
    this.router.navigate(['login'])
    localStorage.clear()
  }
  
}
