import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  userData: any
  constructor(private user: UserService, private formBilder: FormBuilder, private router: Router) {
    this.loginForm = formBilder.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]]
    })
  }
  login() {
    // const { Email, Password } = this.loginForm.value
    console.log(this.loginForm.value)
    // console.log("nsnqknlkm,mnabnfewgfgd")
    this.user.Login(this.loginForm.value).subscribe({
      next: (data) => {
        this.userData = data
        console.log(this.userData)
        localStorage.setItem('token', this.userData.result.AccessToken)
        const token = atob(this.userData.result.AccessToken.split('.')[1])
        console.log(JSON.parse(token))
        localStorage.setItem('FullName', this.userData.result.StoredRepresent.FullName)
        localStorage.setItem('Role', this.userData.result.StoredRepresent.Role)
        this.router.navigate(['/home'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
