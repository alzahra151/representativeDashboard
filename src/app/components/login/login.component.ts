import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Roles } from 'src/app/models/roles';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  userData: any
  CurrentRole: Roles = Roles.Representative
  loading: boolean = false
  visible: boolean = false
  constructor(private user: UserService, private formBilder: FormBuilder, private router: Router, private spinner: NgxSpinnerService) {
    this.loginForm = formBilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    })
  }
  login() {
    this.spinner.show()
    // const { Email, Password } = this.loginForm.value
    console.log(this.loginForm.value)
    // console.log("nsnqknlkm,mnabnfewgfgd")
    this.user.Login(this.loginForm.value).subscribe({
      next: (data) => {
        this.userData = data
        console.log(this.userData)
        this.spinner.show()
        localStorage.setItem('token', this.userData.AccessToken)
        const token = atob(this.userData.AccessToken.split('.')[1])
        console.log(JSON.parse(token))
        localStorage.setItem('FullName', this.userData.StoredRepresent.FullName)
        localStorage.setItem('Role', this.userData.StoredRepresent.Role)
        localStorage.setItem('Image', this.userData.StoredRepresent.Image)

        this.CurrentRole = this.userData.StoredRepresent.Role
        if (this.CurrentRole === Roles.SalesManager) {

          this.router.navigate(['/ManagerHome'])
        } else {
          this.router.navigate(['/RepresentHome'])
        }

      },
      error: (err) => {
        console.log(err)
        this.spinner.hide()
        this.showDialog()
      }
    })
  }

  showDialog() {
    this.visible = true
  }
}
