import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }

  username : string
  password : string

  login() : void {
    //this.router.navigate(["patient"]);
    if(this.username ==undefined || this.password == undefined){
    
     alert("Invalid credentials");
    }else {
      this.router.navigate(["patient"]);
    }
// console.log("===username---"+this.username);
// console.log("===password---"+this.password);

    // if(this.username.len)
    // {

    // }

  }

}
