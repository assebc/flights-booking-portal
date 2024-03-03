import { Component } from '@angular/core';
import { PassengerService } from '../api/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register-passenger',
  templateUrl: './register-passenger.component.html'
})
export class RegisterPassengerComponent {

  form: FormGroup = new FormGroup({});
  requestedUrl?: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private passengerService: PassengerService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe(p => this.requestedUrl = p['requestedUrl']);

    this.form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      firstName: ['', Validators.minLength(2), Validators.maxLength(30)],
      lastName: ['', Validators.minLength(2), Validators.maxLength(30)],
      isFemale: [true, Validators.required]
    });
  }

  get email() { return this.form.get('email')?.value ; }
  get firstName() { return this.form.get('firstName')?.value ; }
  get lastName() { return this.form.get('lastName')?.value ; }
  get isFemale() { return this.form.get('isFemale')?.value ; }

  register(){
    if(this.form.invalid) { return; }

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
    this.router.navigate([this.requestedUrl ?? '/search-flights']);
  };
}
