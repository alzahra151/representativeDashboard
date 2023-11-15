import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registerForm: FormGroup
  ImageFile: any
  message: any;
  imageUrl: any | ArrayBuffer | null;
  constructor(private user: UserService, private formBilder: FormBuilder, private router: Router) {
    this.registerForm = formBilder.group({
      FullName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]{3,}( {1,2}[a-zA-Z]{3,}){1,}$")]],
      Password: ['', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$")]],
      Confirm_Password: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      Phone: [''],
      Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Country: ['', [Validators.required]],
    },)
  }
  get password() {
    return this.registerForm.controls['Password'].value
  }
  get confrimPassword() {
    return this.registerForm.controls["Confirm_Password"].value
  }
  get FullName() {
    return this.registerForm.get("FullName")
  }
  get User_Password() {
    return this.registerForm.get("Password")
  }
  get Confirm_Password() {
    return this.registerForm.get("Confirm_Password")
  }
  get User_Mobile() {
    return this.registerForm.get("Mobile")
  }
  //  get User_Mobile(){
  //   return this.registerForm.get("Mobile")
  //  }
  get User_Email() {
    return this.registerForm.get("Email")
  }
  get User_Adress() {
    return this.registerForm.get("Country")
  }

  register() {
    // let user = this.registerForm.value
    const { FullName, Mobile, Email, Country, Password } = this.registerForm.value

    var user = new FormData()
    user.append('FullName', FullName)
    user.append('Mobile', Mobile)
    user.append('Email', Email)
    user.append('Password', Password)
    user.append('Image', this.ImageFile)
    user.append('Country', Country)
    console.log(user)
    this.user.Register(user).subscribe({
      next: (data) => {
        this.router.navigate(['/'])
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
