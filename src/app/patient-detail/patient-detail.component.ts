import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.css']
})
export class PatientDetailComponent implements OnInit {

  patient = {};
  visit = {};
  model: any = {};
  isHidden: boolean = true;
  isShow: boolean = true;
  isForm: boolean = false;
  isGlobalValue:string;


  patientFormVisit: FormGroup;
  patientid: string = '';
  last_visit: string = '';
  doctor_name: string = '';
  comments: string = '';
  next_visit: string = '';
  medicines: string = '';
  others: string = '';
  id: string = '';
 
  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getPatientDetails(this.route.snapshot.params['id']);
    this.getPatientVisit(this.route.snapshot.params['id']);

    this.patientFormVisit = this.formBuilder.group({
      'patientid' : [null, Validators.required],
      'last_visit' : [null, Validators.required],
      'doctor_name' : [null, Validators.required],
      'comments' : [null, Validators.required],
      'next_visit' : [null, Validators.required],
      'medicines' : [null, Validators.required],
      'others' : [null],
    });

  }

  

  getShoworHide(bol:boolean)
  {
    this.isHidden = bol;
    
  }

  getPatientDetails(id) {
    this.api.getPatient(id)
      .subscribe(data => {
       // console.log(data);
        this.patient = data;
        //console.log(JSON.stringify(this.patient));
      });
  }

  getPatientVisit(id) {
    this.api.getPatientVisit(id)
      .subscribe(data => {
       // console.log(data);
        this.visit = data;
        //console.log(JSON.stringify(this.visit));
      });
  }

  deletePatient(id) {
    this.api.deletePatient(id)
      .subscribe(res => {
        this.router.navigate(['/patients']);
      }, (err) => {
        console.log(err);
      }
      );
  }

  getAddpage()
  {

    this.isForm = true;

    this.isHidden = false;
    this.isShow = true;

    this.isGlobalValue = "add";

    this.patientFormVisit.setValue({
      last_visit: '',
      next_visit:'',
      doctor_name: '',
      medicines: '',
      comments: '',
      others:'',
      patientid:this.route.snapshot.params['id'],
    });
  }

  //Add visit details

  onFormSubmit(form: NgForm) {
    if(this.isGlobalValue=="add")
    {
      this.api.postPatientVisit(form)
      .subscribe(res => {
        let id = res['id'];
        console.log("==id"+id);
        //this.router.navigate(['/patients', id]);
        //this.getPatientDetails(this.route.snapshot.params['id']);
        this.router.navigate(['/patient-details',this.route.snapshot.params['id']]);
        window.location.reload();
      }, (err) => {
        console.log(err);
      });

    }else if(this.isGlobalValue=="edit")
    {
          this.api.updatePatientVisit(this.id, form)
            .subscribe(res => {
              let id = res['id'];
              //this.router.navigate(['/patient-details', id]);
              this.router.navigate(['/patient-details',this.route.snapshot.params['id']]);
              window.location.reload();
            }, (err) => {
              console.log(err);
            }
          );
    }
  }

  edit(medicalid)
  {
    this.isForm = true;
    this.isShow = false;
    this.isHidden = true;

    this.isGlobalValue = "edit";

    this.api.getPatientEdit(medicalid).subscribe(data => {

      //console.log("edit==="+JSON.stringify(data));
      this.id = data.id;
      this.patientFormVisit.setValue({
        last_visit: data.last_visit,
        next_visit: data.next_visit,
        doctor_name: data.doctor_name,
        medicines: data.medicines,
        comments: data.comments,
        others:data.others,
        patientid:data.patientid,
      });
    });

  }

  cancelForm()
  {
    this.isForm = false;
  }

}


