import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

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

  signIn() {
    this.error = null;
    this.smessage = false;
    this.authService.signIn(this.user)
      .subscribe(
        res => {
          this.smessage = !!(res && res.token);
          const details = {...this.user, token: res.token};
          localStorage.setItem('userDetails', JSON.stringify(details))
          this.router.navigate(['/private']);
        },
        err => {
          console.log(err)
          this.error = err.error && err.error.message
            ? this.error = err.error.message
            : (err.error || 'something went wrong');
        }
      )
  }
}
