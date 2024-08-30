import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../auth.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly alertService: AlertService,
    private readonly router: Router
  ) {
    this.setup();
  }

  ngOnInit() {
  }

  setup() {
    this.form = this.formBuilder.group({
      email: [ '', [Validators.required, Validators.email]],
      password: [ '', [Validators.required]],
    });
  }

  
  async signin() {
    if(this.form.invalid) {

      this.alertService.alert('Formulário inválido');
      return;
    }
    
    const loading = await this.alertService.loading();

    this.authService.signIn(this.form.value)
    .subscribe({
      next: () => {
        this.alertService.toast('Login realizado com sucesso');
        loading.dismiss();
        this.router.navigateByUrl('/customers');
      },
      error: (err: any) => {
        this.alertService.alert('Erro ao realizar login');
        loading.dismiss();
      },
    });
    
  }

}
