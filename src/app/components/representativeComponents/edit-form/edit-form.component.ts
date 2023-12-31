import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { io } from 'socket.io-client';
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
  TotalCopies: number = 0
  socket = io('https://varrox-system-apii.onrender.com');
  countries: any = [];
  newCountry: boolean = false
  country: any
  constructor(private reqService: RequestService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {
    this.ReqForm = formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(2)]],
      Mobile: ['', [Validators.required]],
      Phone: [''],
      Email: [''],
      NewCountry: [''],
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
      Notes: [],
    })
    this.socket.on('ReqChange', (change) => {
      console.log('User change:', change);
      // this.getRequests()
      // console.log(change)
    });
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
    this.getCounries()
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
  get PaymentPlan() {
    return this.ReqForm.get('PaymentPlan');
  }
  get NewCountry() {
    return this.ReqForm.get('NewCountry')
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
      serviceTotalPrice: []
    });
  }
  DeviceInp(serviceIndex: number): FormArray {
    return this.Services()
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
  async AddNewReq() {
    await this.calculateServiceSubTotal()
    if (this.newCountry) {
      await this.addCountry()
    }
    const req = { ...this.ReqForm.value, Complete: true, Comment: null }
    const offerData = { "Services": this.Services().value, "TotalPrice": this.TotalPriceOffer, "TotalCopies": this.TotalCopies }
    forkJoin([
      this.reqService.updateReq(this.EditedReq._id, req),
      this.reqService.updatePriceOffer(this.EditedReq.PriceOffer._id, offerData)
    ]).subscribe(
      ([resultFromFirst, resultFromSecond]) => {
        console.log('update request result:', resultFromFirst);
        console.log('update offer result:', resultFromSecond);
        this.router.navigate(['/RepresentHome/requests'])

      },
      error => {
        console.error('Error:', error);
      }
    );
  }
  async archiveRequest() {
    await this.calculateServiceSubTotal()
    if (this.newCountry) {
      await this.addCountry()
    }
    const offerData = { "Services": this.Services().value, "TotalPrice": this.TotalPriceOffer, "TotalCopies": this.TotalCopies }
    forkJoin([
      this.reqService.updateReq(this.EditedReq._id, this.ReqForm.value),
      this.reqService.updatePriceOffer(this.EditedReq.PriceOffer._id, offerData)
    ]).subscribe(
      ([resultFromFirst, resultFromSecond]) => {
        console.log('update request result:', resultFromFirst);
        console.log('update offer result:', resultFromSecond);
        this.router.navigate(['/RepresentHome/requests-archieve'])

      },
      error => {
        console.error('Error:', error);
      }
    );
  }

  setFormValues() {
    const formValues: any = {};
    this.Services().clear()
    let TotalPrice = 0
    let totalCopies = 0
    for (const obj of this.EditedReq?.PriceOffer?.Services) {
      const newItemIndex = this.Services().length;
      this.Services().push(this.addServiceGroup())
      // this.calculateServiceSubTotal()
      for (const obj2 of obj.Devices) {
        this.DeviceInp(newItemIndex).push(this.newDevice())
        console.log(this.Services().length)
        // this.calculateServiceSubTotal()
      }
      console.log(this.Services().length)

    }
    console.log(this.Services().length)
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
          formValues['Services'][index] = { Service: obj.Service._id, Devices: devices, serviceTotalPrice: obj.serviceTotalPrice }
          this.getSeviceDevices(obj.Service._id, index)
          this.SelectedDevices[index] = obj.Devices.map((device: any) => device.Device)
        });

        continue;
      }
    }
    this.ReqForm.patchValue(formValues);
    this.Country?.patchValue(this.EditedReq.Country._id)
    this.PaymentPlan?.patchValue(this.EditedReq.PaymentPlan._id)

    // this.calculateServiceSubTotal()
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
    if (this.SelectedDevices.length < this.Services().length) this.SelectedDevices.push([]) //push empty array from new devices for selected service
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
    let totalCopies = 0
    for (let i = 0; i < this.Services().length; i++) {
      let serviceTotalPrice = 0
      for (let j = 0; j < this.DeviceInp(i).length; j++) {
        const quentity = this.DeviceInp(i)?.controls[j]?.value.Quantity
        const DeviceID = this.DeviceInp(i)?.controls[j]?.value.Device
        const device = this.selectedValues[i].Devices.find((device: any) => device._id === DeviceID)
        let price = device.Price.find((price: any) => this.Country?.value === price.country._id)
        console.log(price)
        if (!price) {
          price = device.Price.find((price: any) => price.country.name == 'غير ذلك')
        }
        const subTotal = quentity * JSON.parse(price.price)
        let subTotalControl = this.DeviceInp(i)?.controls[j].get('SubTotalPrice')
        subTotalControl?.patchValue(subTotal)
        TotalPrice = TotalPrice + subTotalControl?.value
        serviceTotalPrice = serviceTotalPrice + subTotal
        totalCopies = totalCopies + quentity
      }
      this.Services()?.controls[i]?.get('serviceTotalPrice')?.patchValue(serviceTotalPrice)
      console.log(this.Services()?.controls[i].get('serviceTotalPrice'))
    }
    this.TotalPriceOffer = TotalPrice
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
    this.Services().removeAt(serviceIndex)
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
  changCountry(event: any) {
    this.newCountry = false
    console.log(event.target.value)
    this.Country?.patchValue(event.target.value)
    if (event.target.value == '6583920edc4e37385f4c8bf6') {
      this.newCountry = true
    }
  }
  addCountry() {
    console.log(this.NewCountry?.value)
    const countryData = { 'name': this.NewCountry?.value }
    this.reqService.addCountry(countryData).subscribe({
      next: (data) => {
        console.log(data)
        this.country = data
        console.log(this.country)
        this.Country?.patchValue(this.country._id)
      },
      error: (err) => {
        console.log(err.message)
      }
    })
  }


}
