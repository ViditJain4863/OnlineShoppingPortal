import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { User } from '../_models/user';


@Component({
  templateUrl: './users-list.component.html',
})
export class UsersListComponent implements OnInit {
  users?:User[];
  user:any;

  constructor( private route: ActivatedRoute, private router: Router, 
    private acc:AccountService) { 
      this.user=this.acc.userValue;
  }

  ngOnInit(): void 
  {
    this.GetAllUsers(); 
  }

  delete(id: number) {  
    var ans = confirm("Do you want to delete user with Id: " + id);  
    if (ans) {  
        this.acc.delete(id).subscribe((data) => {  
            this.GetAllUsers();
        }, error => console.error(error))  
    }  
  } 

  GetAllUsers():void{
    this.acc.getAllUsers().subscribe((users) => {
      this.users = users.filter(x=>x.role=="User");
    });
  }
}
