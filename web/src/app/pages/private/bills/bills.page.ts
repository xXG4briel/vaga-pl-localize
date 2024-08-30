import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss', '../util.scss'],
})
export class BillsPage implements OnInit {

  id: string = '';
  customerId: string = '';
  bills = [
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
    {
      id: '1234',
      description: 'Descrição',
      value: 1,
      dueDate: 1,
    },
  ];
  form: FormGroup = new FormGroup({});
  useForm = false;

  constructor(
    private readonly activate: ActivatedRoute,
    private readonly alertService: AlertService,
    private readonly billService: BillsService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.setup();
  }

  ngOnInit() {
    const { id, customerId } = this.activate.snapshot.params;
    this.customerId = customerId;
    if(id) {
      this.useForm = true;
      this.bills = [];
      
      this.getBill(id);
    }
    else if(customerId) {
      this.getBills();
    }
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
      description: [ '', [Validators.required]],
      dueDate: [ '', [Validators.required]],
      value: [ '', [Validators.required]],
      status: [ 'open', []],
    });
  }

  async getBill(id: string) {
    this.bills = [];

    const loading = await this.alertService.loading();

    this.billService.find(id).subscribe({
      next: (res: any) => {
        this.form.patchValue({
          description: res.description,
          dueDate: res.dueDate,
          value: res.value,
          status: res.status,
        });
        loading.dismiss();
      },
      error: (err) => {
        this.alertService.toast('Erro ao buscar cliente');
        loading.dismiss();
      }
    });
    
    
  }
  async getBills() {
    const loading = await this.alertService.loading();
    // this.customerId
    this.billService.getBills(this.customerId).subscribe({
      next: (res: any) => {
        loading.dismiss();
      },
      error: (err) => {
        this.alertService.toast('Erro ao buscar cliente');
        loading.dismiss();
      }
    });    
  }
  async createBill(id: string) {

    if(this.form.invalid) {
      this.alertService.toast('Formulário inválido');
      return;
    }

    const loading = await this.alertService.loading();
  
    this.billService.store(this.form.value).subscribe({
      next: (res: any) => {
        loading.dismiss();
      },
      error: (err) => {
        this.alertService.toast('Erro ao edutar cliente');
        loading.dismiss();
      }
    });
  }
  async editBill(id: string) {

    if(this.form.invalid) {
      this.alertService.toast('Formulário inválido');
      return;
    }

    const loading = await this.alertService.loading();
  
    this.billService.update(id, this.form.value).subscribe({
      next: (res: any) => {
        loading.dismiss();
      },
      error: (err) => {
        this.alertService.toast('Erro ao edutar cliente');
        loading.dismiss();
      }
    });
  }
  async deleteBill(id: string) {
    this.alertService.confirm('Tem certeza que deseja excluir esse cliente e todas as suas faturas ?', async () => {
      await this.delete(id);
    });
  }
  async delete(id: string) {
    const loading = await this.alertService.loading();

    this.billService.remove(id).subscribe(
      (res) => {
        this.alertService.toast('Cliente excluido com sucesso');
        loading.dismiss();
        this.getBills();
      },
      (err) => {
        loading.dismiss();
        this.alertService.toast('Erro ao excluir cliente');
      }
    );
  }

  async submit() {
    if(this.id) {
      this.editBill(this.id);
    }
    else {
      this.createBill(this.id);
    }
  }

  async goToBill(billId: string) {
    this.router.navigate(['bills', this.customerId, billId]);  
  }
  

}
