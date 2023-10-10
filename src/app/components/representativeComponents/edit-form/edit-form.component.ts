import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentPlan } from 'src/app/models/payment-plan';
import { PriceOffer } from 'src/app/models/price-offer';
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
  SelectedDevice: {} = {}
  Devices: any[][] = []
  selectedValues: any[] = [];
  PaymentPlans: PaymentPlan[] = []
  PriceOffer: PriceOffer = {}
  TotalPriceOffer: Number = 0
  SelectedDevices: any[][] = []
  selected: any
  // ReqID: string | null = '';
  EditedReq: any
  constructor(private reqService: RequestService, private formBuilder: FormBuilder, private route: ActivatedRoute) {
    this.ReqForm = formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Mobile: ['', [Validators.required]],
      Phone: [''],
      Email: [''],
      // Location: [''],
      ActivityName: ['', [Validators.required]],
      ActivityNature: ['', [Validators.required]],
      activityLocation: ['', [Validators.required]],
      Country: ['', [Validators.required]],
      Governorate: ['', [Validators.required]],
      City: ['', [Validators.required]],
      Services: formBuilder.array([this.addServiceGroup()]),
      // PriceOffer: [''],
      BranchesNumber: [, [Validators.required]],
      PaymentPlan: ['', [Validators.required]],
      Notes: [''],
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
    this.getPaymentPlans()
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
  get BranchesNumber() {
    return this.ReqForm.get('BranchesNumber');
  }
  Services(): FormArray {
    return this.ReqForm.get('Services') as FormArray;
  }
  newDevice(): FormGroup {
    return this.formBuilder.group({
      Device: [''],
      Quantity: [],
      SubTotalPrice: []
    });

  }
  addServiceGroup(): FormGroup {
    return this.formBuilder.group({
      Service: [''],
      Devices: this.formBuilder.array([]),
    });
  }
  DeviceInp(serviceIndex: number): FormArray {
    return this.Services()
      .at(serviceIndex)
      .get('Devices') as FormArray;
  }
  addDeviceInp(serviceIndex: number, data: any) {
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

    for (const obj of this.EditedReq?.PriceOffer?.Services) {
      const newItemIndex = this.Services().length;
      this.Services().push(this.addServiceGroup())
      for (const obj2 of obj.Devices) {
        this.DeviceInp(newItemIndex).push(this.newDevice())
      }
    }
    //set edited item values to form value
    for (const key in this.ReqForm.controls) {
      if (this.ReqForm.controls.hasOwnProperty(key) && this.EditedReq.hasOwnProperty(key)) {

        formValues[key] = this.EditedReq[key];

      }
      if (key == 'Services') {

        formValues['Services'] = []
        console.log(this.EditedReq.PriceOffer)
        this.EditedReq['PriceOffer'].Services.map((obj: any, index: any) => {

          console.log(obj)
          const devices = obj.Devices.map(({ Device, Quantity, SubTotalPrice }: any) => ({
            Device: Device._id,
            Quantity,
            SubTotalPrice,
          }));
          console.log(devices)
          formValues['Services'][index] = { Service: obj.Service._id, Devices: devices }
          this.getSeviceDevices(obj.Service._id, index)
          this.SelectedDevices[index] = obj.Devices.map((device: any) => device.Device)
        });

        continue;
      }

    }
    this.ReqForm.setValue(formValues);
  }
  getReqById() {
    this.reqService.GetReqDetails(this.ReqID).subscribe({
      next: (req) => {
        this.EditedReq = req
        console.log(this.EditedReq)
        this.setFormValues();
      }
      , error: (err) => {
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
  // AddPriceoffer() {
  //   // this.calculateServiceSubTotal()
  //   const offerData = { "Services": this.Services().value, "TotalPrice": this.TotalPriceOffer }
  //   console.log(offerData)
  //   this.reqService.AddPriceOffer(offerData).subscribe({
  //     next: (value) => {
  //       this.PriceOffer = value
  //       console.log(this.PriceOffer)
  //       this.archiveRequest()
  //     },
  //     error: (error) => {
  //       console.log(error.message)
  //     }
  //   })
  // }
  calculateServiceSubTotal() {
    let TotalPrice = 0
    for (let i = 0; i < this.Services.length; i++) {
      for (let j = 0; j < this.DeviceInp(i).length; j++) {
        const quentity = this.DeviceInp(i)?.controls[j]?.value.Quantity
        const DeviceID = this.DeviceInp(i)?.controls[j]?.value.Device
        const device = this.selectedValues[i].Devices.find((device: any) => device._id == DeviceID)
        const subTotal = quentity * JSON.parse(device.Price)
        let subTotalControl = this.DeviceInp(i)?.controls[j].get('SubTotalPrice')
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
    this.Services().removeAt(serviceIndex)
  }



}
