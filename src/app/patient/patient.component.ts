import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';

import { ViewChild } from '@angular/core';
import {
         MatToolbar,
         PageEvent,
         MatPaginator,
         MatSpinner,
         MatSort,
         MatTableDataSource
       } from '@angular/material';


       import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  //@ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  patients: any;
  displayedColumns = ['id','first_name', 'last_name','age', 'date_of_birth', 'height','weight','telephone', 'email_address','address','edit','delete'];
   dataSource = new PatientDataSource(this.api);
  //dataSource = new MatTableDataSource(this.api);
  

  constructor(private api: ApiService, private router: Router) { }

  //ngAfterViewInit() {
    // add ngAfterViewInit hook
        //this.dataSource.paginator = this.paginator;
   // }

    ngAfterViewInit() {
      // this.dataSource.paginator = this.paginator;
      // this.dataSource.sort = this.sort;
    }

  ngOnInit() {
    this.api.getPatients()
      .subscribe(res => {
        console.log(res);
        this.patients = res;
      }, err => {
        console.log(err);
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

}



export class PatientDataSource extends DataSource<any> {
  constructor(private api: ApiService) {
    super();
  }

  connect() {
    return this.api.getPatients();
  }

  disconnect() {

  }


  

}