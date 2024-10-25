import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-pass',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './forgot-pass.component.html',
  styleUrl: './forgot-pass.component.css'
})
export class ForgotPassComponent {
 
  confirmPassword:string = "none"; 
  api:any;
  constructor(apiservice:ApiService,private route:Router){
  this.api = apiservice
  }

  ForgotPassForm = new FormGroup({
    email : new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required]),
    cpassword:new FormControl('')
  })

  get Email() : FormControl{
    return this.ForgotPassForm.get('email') as FormControl;
  } 
  get Password() : FormControl{
    return this.ForgotPassForm.get('password') as FormControl;
  } 

  get Cpassword() : FormControl{
    return this.ForgotPassForm.get('cpassword') as FormControl;
  } 

  onSubmit(){
    if(this.Password.value == this.Cpassword.value)
    {
      this.confirmPassword = 'none';

      var user = {...this.ForgotPassForm.value}

      this.api.UpdatePass(user).subscribe((res:any)=>{
        if(res=="Faliure"){
          alert("username does not exist")
        }
        else{
          alert("You have successfully updated your password. Please Login")
          this.route.navigate(['/login'])
        }
      })
    }
    else
    {
      this.confirmPassword = 'inline';
    }
  }

}
