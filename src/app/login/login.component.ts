import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  static notBlank(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.trim().length > 0) {
      return null;
    }
    return {notblank: value};
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        LoginComponent.notBlank
      ]]
    });
  }

  onSubmit(value: any) {
    if (this.loginForm.valid) {
      this.authService.logIn(value.username);
      this.router.navigate([this.authService.getRedirectUrl()], {replaceUrl: true});
    }
  }
}
