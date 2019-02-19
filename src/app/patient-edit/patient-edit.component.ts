import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.css']
})
export class PatientEditComponent implements OnInit {

  patientForm: FormGroup;
  id: string = '';
  first_name: string = '';
  last_name: string = '';
  age: string = '';
  date_of_birth: string = '';
  telephone: string = '';
  email_address: string = '';
  address: string = '';
  height: string = '';
  weight: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPatient(this.route.snapshot.params['id']);
    this.patientForm = this.formBuilder.group({
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],
      'age' : [null, Validators.required],
      'date_of_birth': [null, Validators.required],
      'telephone': [null, Validators.required],
      'email_address': [null, Validators.required],
      'address' : [null, Validators.required],
      'height' : [null, Validators.required],
      'weight' : [null, Validators.required],
    });
  }

  getPatient(id) {
    this.api.getPatient(id).subscribe(data => {
      this.id = data.id;
      this.patientForm.setValue({
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        telephone: data.telephone,
        email_address: data.email_address,
        age:data.age,
        address:data.address,
        height:data.height,
        weight:data.weight,
      });
    });
  }

  onFormSubmit(form: NgForm) {
    this.api.updatePatient(this.id, form)
      .subscribe(res => {
        let id = res['id'];
        //this.router.navigate(['/patient-details', id]);
        this.router.navigate(['/patients']);
      }, (err) => {
        console.log(err);
      }
    );
  }

  patientDetails() {
    //this.router.navigate(['/patient-details', this.id]);
    this.router.navigate(['/patients']);
  }

}
