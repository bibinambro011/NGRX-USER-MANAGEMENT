import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { delUser, loadUsers } from 'src/app/store/User/user.action';
import { getUserList } from 'src/app/store/User/user.selector';
import { User } from 'src/app/store/model';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  constructor(private store:Store,private dialog:MatDialog,private router:Router){}
userList !:User[];
datasource: any;
displayedColums: string[] = ["image","name", "email","action"]
  ngOnInit(){
    this.store.dispatch(loadUsers())
    this.store.select(getUserList).subscribe(item=>{
 
      this.userList=item
      console.log(this.userList)
      this.datasource = new MatTableDataSource<User>(this.userList);
     
    })
  }
  FunctionEdit(email:string){
    this.OpenPopup(email, 'Update User');
    
    // this.store.dispatch(getassociate({id:code}))
  }
  FunctionDelete(email:string){
    if(confirm('do you want to remove?')){
      this.store.dispatch(delUser({email:email}));
    }
  }

  FunctionAdd(){
    this.OpenPopup('', 'Add User');
  }

  OpenPopup(email: string, title: string) {
    // this.store.dispatch(openpopup());
    this.dialog.open(AddUserComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: email,
        title: title
      }
    })

  }
  logout(){
    this.router.navigate(['admin'])
    localStorage.clear()
  }
}
