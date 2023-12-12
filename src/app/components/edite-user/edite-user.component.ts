import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edite-user',
  templateUrl: './edite-user.component.html',
  styleUrls: ['./edite-user.component.scss']
})
export class EditeUserComponent implements OnInit {
  userData: any
  registerForm: FormGroup
  userImg: any
  public roles: any = ['Manager', 'secretarial'];
  ImageFile: any
  message: any;
  imageUrl: any | ArrayBuffer | null;
  constructor(private user: UserService, private formBilder: FormBuilder, private router: Router) {
    this.registerForm = formBilder.group({
      FullName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,}( {1,2}[a-zA-Z]{3,}){1,}$")]],
      Mobile: ['', [Validators.required]],
      // Phone: [''],
      // Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Country: ['', [Validators.required]],
      Image: [''],
      Role: ['']
    },)
  }
  ngOnInit(): void {
    this.getUser()
  }
  get FullName() {
    return this.registerForm.get("FullName")
  }
  get User_Password() {
    return this.registerForm.get("Password")
  }
  get User_Mobile() {
    return this.registerForm.get("Mobile")
  }

  // get User_Email() {
  //   return this.registerForm.get("Email")
  // }
  get User_Adress() {
    return this.registerForm.get("Country")
  }



  getUser() {
    const formValues: any = {};
    this.user.getUser().subscribe({
      next: (data) => {
        this.userData = data
        console.log(this.userData)
        this.ImageFile = this.userData.Image

        for (const key in this.registerForm.controls) {
          if (this.registerForm.controls.hasOwnProperty(key) && this.userData.hasOwnProperty(key)) {
            formValues[key] = this.userData[key];
          }
          // console.log(formValues)
        }
        this.registerForm.patchValue(formValues)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  updateUser() {
    const { FullName, Mobile, Email, Country } = this.registerForm.value
    // console.log(this.registerForm.controls['Image'].value());
    console.log(this.registerForm.value)
    console.log(this.ImageFile)
    console.log(FullName, Mobile)
    var user = new FormData()
    user.append('FullName', FullName)
    user.append('Mobile', Mobile)
    // user.append('Email', Email)
    user.append('Image', this.ImageFile)
    user.append('Country', Country)
    console.log(user)
    this.user.updateUser(user).subscribe({
      next: (data) => {
        console.log(data)
        this.registerForm.reset()
        // this.router.navigate(['/'])
        this.userImg = data
        localStorage.setItem('Image', this.userImg.Image)
        this.user.imageSubject.next(localStorage.getItem('Image'))
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
  OnUpload(event: any) {
    this.ImageFile = event.target.files[0]
    const reader = new FileReader();
    // this.ImageFile = files[0];
    reader.readAsDataURL(this.ImageFile);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }

  }
}
