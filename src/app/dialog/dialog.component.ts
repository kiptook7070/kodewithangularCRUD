import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  seasons: string[] = ['One', 'Two', 'Three', 'Four'];
  employeeForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private Api : ApiService, private matDialogRef :MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      empName : ['',Validators.required],
      category : ['',Validators.required],
      experience : ['',Validators.required],
      salary : ['',Validators.required],
      date : ['',Validators.required],
      description : ['',Validators.required]
    })
  }

  addEmployee(){
    // console.log(this.employeeForm.value)

    if(this.employeeForm.valid){
      this.Api.postEmployee(this.employeeForm.value)
      .subscribe({
        next: (res)=>{
        alert("Employee Added Successfuly!");
        this.employeeForm.reset();
        this.matDialogRef.close('save');
        },
        error: ()=>{
          alert("Error Occurred!")
        }
      }
      )
    }
  }

}
