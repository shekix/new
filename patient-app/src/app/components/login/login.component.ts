import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

api:any;
id:any
constructor(api:ApiService, private router:Router){
this.api = api;
}

loginForm = new FormGroup({
  email : new FormControl('',[Validators.required,Validators.email]),
  password:new FormControl('',[Validators.required])
})

get Email() : FormControl{
  return this.loginForm.get('email') as FormControl;
} 
get Password() : FormControl{
  return this.loginForm.get('password') as FormControl;
} 
isUserValid:boolean = false;

onLogin(){
  var data = {... this.loginForm.value}
  this.api.loginUser(data).subscribe((res:any)=>{
    if(res =='Failure'){
      alert('Invalid credentials');
      this.isUserValid = false;
      this.api.isLoggedIn(this.isUserValid);
    }else{
      alert('You have successfully logged in');
      this.isUserValid=true;
      this.api.isLoggedIn(this.isUserValid);
      this.router.navigate(['/home']);
    }
  })
}

}
