import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CustomersService } from 'src/app/services/customers.service';
import { GetCustomers } from 'src/app/types';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss', '../util.scss'],
})
export class CustomersPage implements OnInit {

  id: string = '';

  form: FormGroup = new FormGroup({});
  useForm = false;
  customers: GetCustomers[] = [];

  constructor(
    private readonly activate: ActivatedRoute,
    private readonly alertService: AlertService,
    private readonly customerService: CustomersService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router
  ) {
    this.setup();
  }

  ngOnInit() {
    const { id } = this.activate.snapshot.params;
    if(id) {
      this.useForm = true;
      this.customers = [];
      
      if(!/new/.test(id)) {
        this.id = id;
        this.getCustomer(id);
      }
      else {
      }
      
    }
    else {
      this.getCustomers();
    }
  }

  ionViewWillEnter() {
    this.getCustomers();
  }

  goBack() {
    history.back();
  }

  cancel() {
    this.form.reset();
    this.goBack();
  }

  setup() {
    this.form = this.formBuilder.group({
      name: [ '', [Validators.required]]
    });
  }

  async getCustomer(id: string) {
    this.customers = [];

    const loading = await this.alertService.loading();

    this.customerService.find(id).subscribe({
      next: (res: any) => {
        this.form.patchValue({
          name: res.name,
        });
        loading.dismiss();
      },
      error: (err) => {
        this.alertService.toast('Erro ao buscar cliente');
        loading.dismiss();
      }
    });
    
    
  }
  async getCustomers() {
    const loading = await this.alertService.loading();
  
    this.customerService.index().subscribe({
      next: (res: any) => {
        loading.dismiss();
        this.customers = res;
      },
      error: (err) => {
        this.alertService.toast('Erro ao buscar cliente');
        loading.dismiss();
      }
    });    
  }
  async createCustomer(id: string) {

    if(this.form.invalid) {
      this.alertService.toast('Formulário inválido');
      return;
    }

    const loading = await this.alertService.loading();
  
    this.customerService.store(this.form.value).subscribe({
      next: (res: any) => {
        loading.dismiss();
        this.alertService.toast('Cliente criado com sucesso');
        this.router.navigateByUrl('/customers');
      },
      error: (err) => {
        this.alertService.toast('Erro ao editar cliente');
        loading.dismiss();
      }
    });
  }
  async editCustomer(id: string) {

    if(this.form.invalid) {
      this.alertService.toast('Formulário inválido');
      return;
    }

    const loading = await this.alertService.loading();
  
    this.customerService.update(id, this.form.value).subscribe({
      next: (res: any) => {
        loading.dismiss();
        this.alertService.toast('Cliente editado com sucesso');
        this.router.navigateByUrl('/customers');
      },
      error: (err) => {
        this.alertService.toast('Erro ao edutar cliente');
        loading.dismiss();
      }
    });
  }
  async deleteCustomer(id: string) {
    this.alertService.confirm('Tem certeza que deseja excluir esse cliente e todas as suas faturas ?', async () => {
      await this.delete(id);
    });
  }
  async delete(id: string) {
    const loading = await this.alertService.loading();

    this.customerService.remove(id).subscribe(
      (res) => {
        this.alertService.toast('Cliente excluido com sucesso');
        loading.dismiss();
        this.getCustomers();
      },
      (err) => {
        loading.dismiss();
        this.alertService.toast('Erro ao excluir cliente');
      }
    );
  }

  async submit() {
    if(this.id) {
      this.editCustomer(this.id);
    }
    else {
      this.createCustomer(this.id);
    }
  }

}
