import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { PaymentPlan } from 'src/app/models/payment-plan';
import { PriceOffer } from 'src/app/models/price-offer';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss']
})
export class RequestFormComponent implements OnInit {
  ReqForm: FormGroup
  services: any
  ReqID: string | null = '';
  SelectedDevice: {} = {}
  Devices: any[][] = []
  selectedValues: any[] = [];
  PaymentPlans: PaymentPlan[] = []
  PriceOffer: PriceOffer = {}
  TotalPriceOffer: Number = 0
  SelectedDevices: any[][] = []
  selected: any
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
      BranchesNumber: [, [Validators.required]],
      PaymentPlan: ['', [Validators.required]],
      Notes: [''],
    })
  }
  ngOnInit(): void {
    this.GetServices()
    this.getPaymentPlans()
  }

  get ActivityName() {
    return this.ReqForm.get('ActivityName');
  }

  get BranchesNumber() {
    return this.ReqForm.get('BranchesNumber');
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
      Quantity: [],
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
      Device: [device._id],
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
  AddPriceoffer() {
    // this.calculateServiceSubTotal()
    const offerData = { "Services": this.Services.value, "TotalPrice": this.TotalPriceOffer }
    console.log(offerData)
    this.reqService.AddPriceOffer(offerData).subscribe({
      next: (value) => {
        this.PriceOffer = value
        console.log(this.PriceOffer)
        this.archiveRequest()
      },
      error: (error) => {
        console.log(error.message)
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
    console.log(this.PriceOffer._id)
    const ReqData = { ...this.ReqForm.value, PriceOffer: this.PriceOffer._id }
    this.reqService.AddPriceOfferReq(ReqData).subscribe({
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
    const service = this.services.find((service: any) => service._id === id)
    // this.Devices = service.Devices
    this.selectedValues[index] = service;
    console.log(this.selectedValues)
  }
  clearDevicesFormArray = (index: number) => {
    this.DeviceInp(index).controls = [];
    this.DeviceInp(index).patchValue([])
    console.log(this.SelectedDevices)
    this.SelectedDevices[index] = []
    console.log(this.SelectedDevices)
  }
  SelectedService(event: any, index: any) {
    this.clearDevicesFormArray(index) //clear devices when change service
    const id = event.target?.value
    this.getSeviceDevices(id, index)
    if (this.SelectedDevices.length < this.Services.length) this.SelectedDevices.push([]) //push empty array from new devices for selected service
  }

  SelectedDevicesPrice(event: any, serviceIndex: any) {
    const deviceID = event.target?.value
    console.log(deviceID)
    this.reqService.getDeviceById(deviceID).subscribe({
      next: (data) => {
        console.log(data)
        this.addDeviceInp(serviceIndex, data)
        this.SelectedDevices[serviceIndex].push(data) //push selected device in the array
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  calculateServiceSubTotal() {
    let TotalPrice = 0
    for (let i = 0; i < this.Services.length; i++) {
      for (let j = 0; j < this.DeviceOffer(i).length; j++) {
        const quentity = this.DeviceOffer(i)?.controls[j]?.value.Quantity
        const DeviceID = this.DeviceOffer(i)?.controls[j]?.value.Device
        const device = this.selectedValues[i].Devices.find((device: any) => device._id == DeviceID)
        const subTotal = quentity * JSON.parse(device.Price)
        let subTotalControl = this.DeviceOffer(i)?.controls[j].get('SubTotalPrice')
        subTotalControl?.patchValue(subTotal)
        TotalPrice = TotalPrice + subTotalControl?.value
      }
    }
    this.TotalPriceOffer = TotalPrice

  }
  getPaymentPlans() {
    this.reqService.getPaymentPlans().subscribe({
      next: (data) => {
        this.PaymentPlans = data
      },
      error: (err) =>
        console.log(err.message)
    })
  }
  deleteDevice(serviceIndex: number, deviceIndex: number) {
    console.log(serviceIndex, deviceIndex)
    this.DeviceInp(serviceIndex).removeAt(deviceIndex)
    this.SelectedDevices[serviceIndex].splice(deviceIndex, 1)
    console.log(this.SelectedDevices)
  }
  deleteService(serviceIndex: number) {
    this.Services.removeAt(serviceIndex)
  }
}
