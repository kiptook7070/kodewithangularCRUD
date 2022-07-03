import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  seasons: string[] = ['One', 'Two', 'Three', 'Four'];
  employeeForm !: FormGroup;

  constructor(private formBuilder : FormBuilder) { }

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
    console.log(this.employeeForm.value)
  }

}
