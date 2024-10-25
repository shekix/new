import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  api:any;
  countries : any[] = [];
  states:any[] = [];
  datemax= new Date();
  constructor(apiService:ApiService){
  this.api = apiService
  }
  
  
  PatientForm = new FormGroup({
    firstName :new FormControl<string>('',[Validators.required]),
    lastName :new FormControl<string>('',[Validators.required]),
    gender :new FormControl<string>('',[Validators.required]),
    dob : new FormControl('',[Validators.required]),
    maritalStatus :new FormControl<string>('',[Validators.required]),
    bloodGroup :new FormControl<string>('',[Validators.required]),
    phoneNumber :new FormControl<string>('',[Validators.required]),
    email :new FormControl<string | null>('',),
    addressLine1 :new FormControl<string>('',[Validators.required]),
    addressLine2 :new FormControl<string | null>(''),
    country :new FormControl<string>('',[Validators.required]),
    state :new FormControl<string>('',[Validators.required]),
    city :new FormControl<string>('',[Validators.required]),
    pastMedicalHistory :new FormControl<string>('',[Validators.required]),
    currentIllness :new FormControl<string>('',[Validators.required]),
    treatedBy :new FormControl<string>('',[Validators.required]),
    treatmentStatus :new FormControl<string>('',[Validators.required]),
    insuranceName :new FormControl<string >('',),
    insuranceId :new FormControl<string>('',),
    coverage :new FormControl<string>('',[Validators.required]),
    emergencyContactName :new FormControl<string>('',[Validators.required]),
    emergencyContactNumber :new FormControl<string>('',[Validators.required]),
  })
  
  patients:any[] = [];
  
  ngOnInit(): void {
    this.api.getPatients().subscribe ( (data:any) =>{
      this.patients = data;   
    });
  }
  
  showCountries(){
    this.api.getCountries().subscribe((data:any)=>{
      this.countries = data;
      })
  }
  
  showStates(event : any){
    this.api.getStates(event.target.value).subscribe((data:any) =>{
      this.states=data; 
    })
  }
  
  DateTime = new Date();

  formSubmit(){
    const data = {... this.PatientForm.value}
    this.api.addPatient(data).subscribe((res:any)=>{
      if(res=="PateintAdded"){
        alert("Patient added");
        this.PatientForm.reset();
      }else{
        alert("Patient with this email already exists")
      }
    })
  }
  
  
  
  Patientid : any;
  AddBtn : any = 'block';
  SaveBtn:any = 'none';
    onUpdate(item:any){
      this.Patientid = item.id;
      this.PatientForm.get('firstName')?.setValue(item.firstName);
      this.PatientForm.get('lastName')?.setValue(item.lastName);
      this.PatientForm.get('gender')?.setValue(item.gender);
      this.PatientForm.get('dob')?.setValue(formatDate(item.dob,'yyyy-MM-dd','en'));
      this.PatientForm.get('maritalStatus')?.setValue(item.maritalStatus);
      this.PatientForm.get('bloodGroup')?.setValue(item.bloodGroup);
      this.PatientForm.get('phoneNumber')?.setValue(item.phoneNumber);
      this.PatientForm.get('email')?.setValue(item.email);
      this.PatientForm.get('addressLine1')?.setValue(item.addressLine1);
      this.PatientForm.get('addressLine2')?.setValue(item.addressLine2);
      this.PatientForm.get('country')?.setValue(item.country);
      this.PatientForm.get('city')?.setValue(item.city);
      this.PatientForm.get('state')?.setValue(item.state);
      this.PatientForm.get('pastMedicalHistory')?.setValue(item.pastMedicalHistory);
      this.PatientForm.get('currentIllness')?.setValue(item.currentIllness);
      this.PatientForm.get('treatedBy')?.setValue(item.treatedBy);
      this.PatientForm.get('treatmentStatus')?.setValue(item.treatmentStatus);
      this.PatientForm.get('insuranceName')?.setValue(item.insuranceName);
      this.PatientForm.get('insuranceId')?.setValue(item.insuranceId);
      this.PatientForm.get('coverage')?.setValue(item.coverage)
      this.PatientForm.get('emergencyContactName')?.setValue(item.emergencyContactName);
      this.PatientForm.get('emergencyContactNumber')?.setValue(item.emergencyContactNumber);

      this.api.getCountries().subscribe((data:any)=>{
        this.countries = data;
        })
      
       let id = this.PatientForm.value.country;
    
        this.api.getStates(id).subscribe((data:any) =>{
          this.states=data;  
        })

        this.AddBtn = 'none';
        this.SaveBtn = 'block';
    
   } 
  
  
  UpdatePatient(){
    
  }
  

  
  


}



