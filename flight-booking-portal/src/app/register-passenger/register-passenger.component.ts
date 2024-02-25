import { Component } from '@angular/core';
import { PassengerService } from '../api/services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html'
})
export class RegisterPassengerComponent {

  form: FormGroup = new FormGroup({});

  constructor(
    private authService: AuthService,
    private router: Router,
    private passengerService: PassengerService,
    private fb: FormBuilder
  ){
    this.form = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      isFemale: [true]
    });
  }

  get email() { return this.form.get('email')?.value ; }
  get firstName() { return this.form.get('firstName')?.value ; }
  get lastName() { return this.form.get('lastName')?.value ; }
  get isFemale() { return this.form.get('isFemale')?.value ; }

  register(){
    this.passengerService.registerPassenger({ body: this.form.value })
      .subscribe(this.login, e => { if(e.status !== 404 ){ console.error(e); }});
  }

  checkPassenger(){
    const params = { email: this.email };
    this.passengerService.findPassenger(params)
      .subscribe(this.login);
  }

  private login = () => {
    this.authService.loginUser({ email: this.email });
    this.router.navigate(['/search-flights']);
  };
}
