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
  // SelectedDevices: [] = []
  Devices: any
  SelectedDevices: any[] = []
  SelectedDevice: any[] = []
  selectedValues: any[] = [];

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
      BranchesNumber: [1, [Validators.required]],
      Notes: [''],
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
  get Services(): FormArray {
    return this.ReqForm.get('Services') as FormArray;
  }
  newDevice(): FormGroup {
    return this.formBuilder.group({
      Device: [''],
      Quantity: [0],
      SubTotalPrice: []
    });

  }
  DeviceOffer(index: any): FormArray {

    return this.Services.at(index).get(`Devices`) as FormArray;
  }
  addServiceGroup(): FormGroup {
    return this.formBuilder.group({
      Service: [''],
      Devices: this.formBuilder.array([]),

    });
  }
  DeviceInp(serviceIndex: number): FormArray {
    return this.Services
      .at(serviceIndex)
      .get('Devices') as FormArray;
  }
  addDeviceInp(serviceIndex: number, device: any) {
    this.DeviceInp(serviceIndex).push(this.formBuilder.group({
      Device: [device],
      Quantity: [],
      SubTotalPrice: []
    }));
  }
  addService(): void {
    this.Services.push(this.addServiceGroup());
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

      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  getSeviceDevices(id: any, index: any) {
    console.log(id)
    const service = this.services.filter((service: any) => service._id === id)
    console.log(service)
    this.Devices = service[0].Devices
    this.selectedValues[index] = service[0].Details;
    console.log(this.selectedValues)
    console.log(this.Devices)
  }
  SelectedService(event: any, index: any) {
    const CopySelectedDevice = [...this.SelectedDevice]
    console.log(this.SelectedDevice)
    this.SelectedDevices[index - 1] = CopySelectedDevice
    console.log(this.SelectedDevices)
    const id = event.target?.value
    console.log(id)
    this.getSeviceDevices(id, index)
  }

  SelectedDevicesPrice(event: any, serviceIndex: any) {
    console.log(serviceIndex)
    const deviceID = event.target?.value
    this.reqService.getDeviceById(deviceID).subscribe({
      next: (data) => {
        this.SelectedDevice.push(data)
        // const CopySelectedDevice = [...this.SelectedDevice]
        // console.log(this.SelectedDevice)
        this.SelectedDevices[serviceIndex] =
          console.log(this.SelectedDevices)
        this.addDeviceInp(serviceIndex, data)
      },
      error: (err) => {
        console.log(err)
      }
    })


  }

}
