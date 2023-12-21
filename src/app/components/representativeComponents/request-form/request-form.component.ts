import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { PaymentPlan } from 'src/app/models/payment-plan';
import { PriceOffer } from 'src/app/models/price-offer';
import { io } from 'socket.io-client';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.scss'],
  providers: [MessageService]
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
  EditedReq: any;
  TotalCopies: number = 0
  selectedCountry: any
  countries: any = []
  constructor(private reqService: RequestService, private formBuilder: FormBuilder, private route: ActivatedRoute,
    private router: Router, private messageService: MessageService,
    private primengConfig: PrimeNGConfig) {
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
      BranchesNumber: [, [Validators.required]],
      PaymentPlan: ['', [Validators.required]],
      Notes: [''],
      TotalCopies: []
    })

  }
  ngOnInit(): void {
    this.GetServices()
    this.getPaymentPlans()
    this.getCounries()
    // this.markFormGroupTouched(this.ReqForm)
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
      serviceTotalPrice: []
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
      Quantity: [, Validators.required],
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
  async AddPriceoffer(sendToManager: Boolean) {
    await this.calculateServiceSubTotal()
    const offerData = { "Services": this.Services.value, "TotalPrice": this.TotalPriceOffer, "TotalCopies": this.TotalCopies }
    console.log(offerData)
    this.reqService.AddPriceOffer(offerData).subscribe({
      next: (value) => {
        this.PriceOffer = value
        console.log(this.PriceOffer)
        if (sendToManager === true) {
          console.log(sendToManager)

          this.AddNewReq() //send request to managers
          // this.router.navigate(['/RepresentHome/requests'])
        } else {
          console.log(sendToManager)
          this.archiveRequest() // archieve req for representative
          // this.router.navigate(['/RepresentHome/requests-archieve'])
        }
      },
      error: (error) => {
        console.log(error.message)
      }
    })
  }
  AddNewReq() {
    console.log(this.ReqID)
    const req = { ...this.ReqForm.value, Complete: true, PriceOffer: this.PriceOffer._id, Comment: null }
    console.log(req)
    this.reqService.AddPriceOfferReq(req).subscribe({
      next: (res) => {
        console.log('sucess', res)
        this.router.navigate(['/RepresentHome/requests'])

        // this.archiveRequest()
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  archiveRequest() {

    const ReqData = { ...this.ReqForm.value, PriceOffer: this.PriceOffer._id }
    this.reqService.AddPriceOfferReq(ReqData).subscribe(
      {
        next: (res) => {
          console.log('sucess', res)
          this.router.navigate(['/RepresentHome/requests-archieve'])

        },
        error: (err) => {
          console.log(err)
        }
      }
      // async (result) => {
      //   // Perform asynchronous operations
      //   console.log('sucess', result)
      //   await this.calculateServiceSubTotal()
      //   this.ReqForm.reset()


      // },
      // (error) => {
      //   console.log(error)
      // }
    )
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
        console.log(this.SelectedDevices)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  calculateServiceSubTotal() {
    let TotalPrice = 0
    let totalCopies = 0
    for (let i = 0; i < this.Services.length; i++) {
      let serviceTotalPrice = 0
      for (let j = 0; j < this.DeviceOffer(i).length; j++) {
        const quentity = this.DeviceOffer(i)?.controls[j]?.value.Quantity
        const DeviceID = this.DeviceOffer(i)?.controls[j]?.value.Device
        const Device = this.DeviceInp(i)?.controls[j]?.value

        console.log(DeviceID, Device)
        const device = this.selectedValues[i].Devices.find((device: any) => device._id == DeviceID)
        console.log(this.SelectedDevices)
        console.log(device)
        const price = device.Price.find((price: any) => this.Country?.value === price.country._id)
        console.log(price)
        const subTotal = quentity * JSON.parse(price.price)
        let subTotalControl = this.DeviceOffer(i)?.controls[j].get('SubTotalPrice')
        subTotalControl?.patchValue(subTotal)
        TotalPrice = TotalPrice + subTotalControl?.value
        serviceTotalPrice = serviceTotalPrice + subTotal
        totalCopies = totalCopies + quentity
      }
      // serviceTotalPrice = serviceTotalPrice+
      // console.log(this.services.controls.get('serviceTotalPrice'))

      this.Services?.controls[i]?.get('serviceTotalPrice')?.patchValue(serviceTotalPrice)
      console.log(this.Services?.controls[i].get('serviceTotalPrice'))
    }
    this.TotalPriceOffer = TotalPrice
    // this.ReqForm.controls['TotalCopies'].patchValue(totalCopies)
    this.TotalCopies = totalCopies
    console.log(this.TotalCopies)
    console.log(this.TotalPriceOffer)

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

  getCounries() {
    this.reqService.getCountries().subscribe({
      next: (data) => {
        this.countries = data
        console.log(this.countries)
      },
      error: (err) => {
        console.log(err.message)
      }

    })
  }

}
