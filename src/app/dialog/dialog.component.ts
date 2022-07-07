import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  seasons: string[] = ['One', 'Two', 'Three', 'Four'];
  employeeForm !: FormGroup;
  actionButton : String= "Save";

  constructor(
    private formBuilder : FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private Api : ApiService, 
    private matDialogRef :MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      empName : ['',Validators.required],
      category : ['',Validators.required],
      experience : ['',Validators.required],
      salary : ['',Validators.required],
      date : ['',Validators.required],
      description : ['',Validators.required]
    });
    //console.log(this.editData);

   if(this.editData){
    this.actionButton = "Update"
    this.employeeForm.controls['empName'].setValue(this.editData.empName);
    this.employeeForm.controls['category'].setValue(this.editData.category);
    this.employeeForm.controls['experience'].setValue(this.editData.experience);
    this.employeeForm.controls['experience'].setValue(this.editData.experience);
    this.employeeForm.controls['salary'].setValue(this.editData.salary);
    this.employeeForm.controls['date'].setValue(this.editData.date);
    this.employeeForm.controls['description'].setValue(this.editData.description);
   }
  }

  addEmployee(){
    // console.log(this.employeeForm.value)

   if(!this.editData){
    if(this.employeeForm.valid){
      this.Api.postEmployee(this.employeeForm.value)
      .subscribe({
        next: (res)=>{
        alert("Employee Added Successfuly!");
        this.employeeForm.reset();
        this.matDialogRef.close('Save');
        },
        error: ()=>{
          alert("Error Occurred!")
        }
      }
      )
    }
   } else{
    this.updateEmployee()
   }
  }
  updateEmployee(){
    this.Api.putEmployee(this.employeeForm.value, this.editData.id)
    .subscribe({
      next: (res)=>{
        alert("Employee Records Updated Successfully");
        this.employeeForm.reset();
        this.matDialogRef.close('Update');
      },
      error: ()=>{
        alert("Error in Updating the Details");
      }
    })
  }

}
