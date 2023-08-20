import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  ReqForm: FormGroup
  services: any
  ReqID: string | null = '';
  constructor(private reqService: RequestService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.ReqForm = formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Mobile: ['', [Validators.required]],
      Phone: [''],
      Email: [''],
      Location: [''],
      ActivityName: ['', [Validators.required]],
      ActivityNature: ['', [Validators.required]],
      activityLocation: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      Governorate: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Services: formBuilder.array([this.addServiceGroup()]),
    })


  }
  ngOnInit(): void {
    this.GetServices()
  }

  get ActivityName() {
    return this.ReqForm.get('ActivityName');
  }
  get ActivityNature() {
    return this.ReqForm.get('ActivityNature');
  }
  get activityLocation() {
    return this.ReqForm.get('activityLocation');
  }
  get Country() {
    return this.ReqForm.get('Country');
  }
  get Governorate() {
    return this.ReqForm.get('Governorate');
  }
  get City() {
    return this.ReqForm.get('City');
  }
  get SystemName() {
    return this.ReqForm.get('SystemName');
  }
  get Name() {
    return this.ReqForm.get('Name');
  }
  get Mobile() {
    return this.ReqForm.get('Mobile');
  }
  Services(): FormArray {
    return this.ReqForm.get('Services') as FormArray;
  }
  newDevice(): FormControl {
    return this.formBuilder.control('');

  }
  addServiceGroup(): FormGroup {
    return this.formBuilder.group({
      Service: [''],
      Devices: this.formBuilder.array([]),
      Notes: ['']
    });
  }
  DeviceInp(serviceIndex: number): FormArray {
    return this.Services()
      .at(serviceIndex)
      .get('Devices') as FormArray;
  }
  addDeviceInp(serviceIndex: number) {
    this.DeviceInp(serviceIndex).push(this.newDevice());
  }
  addService(): void {
    this.Services().push(this.addServiceGroup());
  }
  GetServices() {
    this.reqService.GetServices().subscribe({
      next: (services) => {
        this.services = services
        console.log(this.services)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  AddNewReq() {
    const req = { ...this.ReqForm.value, Complete: true }
    this.reqService.AddPriceOfferReq(req).subscribe({
      next: (res) => {
        console.log('sucess', res)
        this.ReqForm.reset()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  archiveRequest() {
    console.log(this.ReqForm.value)
    this.reqService.AddPriceOfferReq(this.ReqForm.value).subscribe({
      next: (res) => {
        console.log('sucess', res)
        this.ReqForm.reset()
        this.Services().controls.forEach((control) => {
          control.reset();
        });
      },
      error: (err) => {
        console.log(err)
      }
    })
  }



}
