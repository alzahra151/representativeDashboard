import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

  ReqForm: FormGroup
  services: any
  ReqID: string | null = '';
  EditedReq: any
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
    // get id param for edite req 
    this.route.paramMap
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.ReqID = params.get('id');
        console.log(this.ReqID); // price
      }
      );
    this.GetServices()
    this.getReqById()
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

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  AddNewReq() {

    const req = { ...this.ReqForm.value, Complete: true, Comment: null }

    this.reqService.updateReq(this.EditedReq._id, req).subscribe({
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

    this.reqService.updateReq(this.EditedReq._id, this.ReqForm.value).subscribe({
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

  setFormValues() {
    const formValues: any = {};
    this.Services().clear()

    for (const obj of this.EditedReq?.Services) {
      const newItemIndex = this.Services().length;
      this.Services().push(this.addServiceGroup())
      for (const obj2 of obj.Devices) {
        this.DeviceInp(newItemIndex).push(this.newDevice())
      }
    }
    //set edited item values to form value
    for (const key in this.ReqForm.controls) {
      if (this.ReqForm.controls.hasOwnProperty(key) && this.EditedReq.hasOwnProperty(key)) {
        if (key === 'Services') {
          formValues[key] = []
          this.EditedReq[key].map((obj: any, index: any) => {
            formValues[key][index] = { Service: obj.Service._id, Devices: obj.Devices, Notes: obj.Notes }
          });

          continue;
        }
        formValues[key] = this.EditedReq[key];
      }
    }
    this.ReqForm.setValue(formValues);
  }
  getReqById() {
    this.reqService.GetReqDetails(this.ReqID).subscribe({
      next: (req) => {
        this.EditedReq = req
        this.setFormValues();
      }
      , error: (err) => {
        console.log(err)
      }
    })
  }
}
