import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms'
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }
  error: string;
  smessage = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  signUp() {
    this.error = null;
    this.smessage = false;
    this.authService.signUp(this.user)
      .subscribe(
        res => {
          this.smessage = !!(res && res.token);
          const details = {...this.user, token: res.token};
          localStorage.setItem('userDetails', JSON.stringify(details))
          this.router.navigate(['/private']);
          console.log(res)
        },
        err => {
          console.log(err)
          this.error = err.error && err.error.message
            ? this.error = err.error.message
            : 'something went wrong';
        }
      )
  }
}
