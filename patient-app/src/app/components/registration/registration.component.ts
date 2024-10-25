import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import{FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms'
import { log } from 'console';
import { ApiService } from '../../services/api.service';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
api:any
constructor(api:ApiService,private router: Router){
this.api = api;
}


confirmPassword:string = "none";  

regsitrationForm = new FormGroup({
firstName: new FormControl("",[Validators.required]),
lastName: new FormControl("",[Validators.required]),
email: new FormControl("",[Validators.required,Validators.email]),
password: new FormControl("",[Validators.required,Validators.minLength(6)]),
cpassword: new FormControl(""),
})

displayMsg:string = '';
isAccountCreated:boolean = false;
submit(){
  if(this.Password.value == this.Cpassword.value)
  {
    
    this.confirmPassword = 'none'
    
    var user = {... this.regsitrationForm.value}

    this.api.registerUser(user).subscribe((res:any)=>{
      if(res=='success'){
        alert('account created')
        this.isAccountCreated=false;
        this.router.navigate(['/login']);
      }
      else if(res=='AlreadyExists'){
       alert('Account already exists');
        this.isAccountCreated=false;
      }
    })

  }
  else
  {
    this.confirmPassword = 'inline'
  }
}

get FirstName() : FormControl{
  return this.regsitrationForm.get('firstName') as FormControl;
} 
get LastName() : FormControl{
  return this.regsitrationForm.get('lastName') as FormControl;
} 
get Email() : FormControl{
  return this.regsitrationForm.get('email') as FormControl;
} 
get Password() : FormControl{
  return this.regsitrationForm.get('password') as FormControl;
} 
get Cpassword() : FormControl{
  return this.regsitrationForm.get('cpassword') as FormControl;
} 


}
